import React, { Component } from 'react';
import Oux from '../../hoc/Oux/Oux';
import { connect } from 'react-redux';
import TimeAgo from "react-timeago";
import en from "react-timeago/lib/language-strings/en";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import { reportUser, blockUser, unblockUser } from '../../api/authAPI';
import * as actions from "../../redux/actions";
import { toastMsg } from '../../utility/utility';
import { showConfirmAlert } from '../../utility/successAlert/confirmAlert';
import { notifyRecepient } from '../../api/miscApi';
import { CategoriesList, routes, SubscriptionStatus } from '../../utility/constants/constants';

const descriptionViewStyle = {
    whiteSpace: "pre-line",
    textAlign: "justify"
}

class ChatThread extends Component {
    constructor(props) {
        super(props)
        this.state = {
            messages: [],
            isLoading: false,
            inputValue: '',
            isBlocked: false,
            isReported: false,
        }
        this.chatClient = null
        this.messagesEndRef = React.createRef()
        this.autoscroll = false
        this.sendingMessage = false // on enter key press - pressing it twice, sends the msg twice, since the state update is async - using this var to identify the state 
        this.shiftPressed = false
    }

    componentWillMount = () => {
        this.validateChannel()
        var msg = "";


        if (this.props.isSharingViaMsg) {
            if (this.props.user && this.props.service.profile.user_id === this.props.user.id.toString()) {
                if (this.props.service.type.toLowerCase() === CategoriesList.WANT_AD.key.toLowerCase()) {
                    msg = `I’m Seeking this on PartnerHere.com: ${this.props.service.title} ${this.props.shareURL}`
                } else {
                    msg = `I’m Offering this on PartnerHere.com: ${this.props.service.title} ${this.props.shareURL}`
                }
            } else {
                if (this.props.service.type.toLowerCase() === CategoriesList.WANT_AD.key.toLowerCase()) {
                    msg = `Someone’s Seeking this on PartnerHere.com: ${this.props.service.title} ${this.props.shareURL}`
                } else {
                    msg = `Check out this Offer on PartnerHere.com: ${this.props.service.title} ${this.props.shareURL}`
                }
            }

            this.setState({
                inputValue: msg,
            })
            this.props.updatedIsSharingViaMsg(false)
        }
    }

    componentDidMount = () => {
        this.registerForSubscriptions();
        this.scrollToBottom();

    }


    componentDidUpdate = (prevProps, prevState, snapshot) => {
        if (prevProps.blockedByMe !== this.props.blockedByMe ||
            prevProps.reportedByMe !== this.props.reportedByMe ||
            (prevProps.reportedByMe.length === 0 && this.props.reportedByMe.length > 0)) {
            this.validateChannel()
        }

        if (prevProps.blockedByMe.length > this.props.blockedByMe.length) {
            //on unblocking
            this.registerForSubscriptions()
        }

        if (prevProps.selectedChatChannel !== this.props.selectedChatChannel) {
            this.setState({
                inputValue: '',
                messages: [],
                isLoading: false,
            })
            prevProps.selectedChatChannel.removeAllListeners();
            this.validateChannel()
            this.registerForSubscriptions();
        }
        // if (this.autoscroll) {
        this.autoscroll = false
        this.scrollToBottom()
        // }
    }

    componentWillUnmount = () => {
        console.log("componentWillUnmount")
    }

    receiverID = () => {
        let {
            senderId,
            receiverId
        } = this.props.selectedChatChannel.attributes;
        let currentUserId = this.props.user.id;
        return currentUserId === senderId ? parseInt(receiverId) : parseInt(senderId);
    }

    validateChannel = () => {

        let isReported = this.props.reportedByMe.filter(item => parseInt(item.other_user_id) === this.receiverID()).length > 0;
        let isBlocked = this.props.blockedByMe.filter(item => parseInt(item.other_user_id) === this.receiverID()).length > 0;
        this.setState((prevState) => ({
            isReported: isReported,
            isBlocked: isBlocked
        }))
    }

    isReported = () => {
        return this.props.reportedByMe.filter(item => parseInt(item.other_user_id) === this.receiverID()).length > 0;
    }

    isBlocked = () => {
        return this.props.blockedByMe.filter(item => parseInt(item.other_user_id) === this.receiverID()).length > 0;
    }

    scrollToBottom = () => {
        if (this.messagesEndRef.current !== null) {
            // this.messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: "end", inline: "nearest" })
            this.messagesEndRef.scrollIntoView({ behavior: "smooth" });
        }
    }

    registerForSubscriptions = () => {
        const self = this

        if (this.isReported() || this.isBlocked()) {
            return;
        }
        // Listen for new messages sent to a channel
        this.props.selectedChatChannel.on('messageAdded', function (message) {
            var messages = [...self.state.messages];
            console.log(message.author, message.body);
            messages.push(message)
            this.autoscroll = true
            self.setState((prev) => ({ messages: messages }))
        });
        this.getMessages();
    }

    sendMsg = async () => {
        if (!this.sendingMessage) {
            const that = this;
            let text = this.state.inputValue.trim();
            if (text.length === 0) {
                return;
            }
            this.sendingMessage = true

            var receipientId = this.receiverID();

            let emailNotificationResponse = await notifyRecepient(receipientId);
            console.log("send email api!");

            this.sendingMessage = true
            let response = await this.props.selectedChatChannel.sendMessage(text);
            this.setState({ inputValue: '' }, () => {
                that.sendingMessage = false;
            })
        }
    }

    keyPress = (e) => {
        const that = this;
        console.log("pressed:" + e.keyCode);
        console.log("prev code:" + this.prevKeyCode);
        if (!this.shiftPressed && e.keyCode === 13 && !this.sendingMessage) {
            that.sendMsg();
        }
        if (e.keyCode === 16) {
            this.shiftPressed = true
        }
    }

    keyRelease = (e) => {
        if (e.keyCode === 16) {
            this.shiftPressed = false
        }
        console.log("release:" + e.keyCode);
    }

    getMessages = () => {
        // Get Messages for a previously created channel
        const self = this
        // this.props.selectedChatChannel.setAllMessagesConsumed();
        this.props.selectedChatChannel.getMessages().then(function (messages) {
            const totalMessages = messages.items.length;
            var msgs = [] //[...self.state.messages];
            for (var i = 0; i < totalMessages; i++) {
                const message = messages.items[i];
                msgs.push(message)
                console.log('Author:' + message.author);
            }
            self.setState((prev) => ({ messages: msgs }))
            console.log('Total Messages:' + totalMessages);
            self.props.selectedChatChannel.setAllMessagesConsumed();
        });
    }

    handleChange = ({ target }) => {
        const self = this;
        self.setState((prevState) => ({ inputValue: target.value }));
    }

    displayMsg = (msg, index) => {
        const formatter = buildFormatter(en);
        let {
            senderId,
            senderName,
            senderProfileURL,
            receiverId,
            receiverName,
            receiverProfileURL,
        } = this.props.selectedChatChannel.attributes;
        var profilePic = senderId === this.props.user.id ? receiverProfileURL : senderProfileURL;
        profilePic = profilePic ? profilePic : "/custom_images/user.png"

        if (msg.author.includes(this.props.user.email)) {
            //sender
            //  
            return (<div className="outgoing_msg" key={index} id="chat_box">
                <div className="sent_msg">
                    <p>
                        <span className="msgs_para" style={descriptionViewStyle}>{msg.body}</span>
                        <span className="time_date">    <TimeAgo
                            date={msg.timestamp}
                            formatter={formatter} /></span>
                    </p>
                </div>
            </div>);
        } else {
            //recevier
            return (
                <div className="incoming_msg" key={index} id="chat_box">
                    <div className="incoming_msg_img">
                        <img src={profilePic} alt="" />
                    </div>
                    <div className="received_msg">
                        <div className="received_withd_msg">
                            <p>
                                <span className="msgs_para" style={descriptionViewStyle}>{msg.body}</span>
                                <span className="time_date"> <TimeAgo
                                    date={msg.timestamp}
                                    formatter={formatter} /></span>
                            </p>
                        </div>
                    </div>
                </div>
            );
        }
    }

    reportUser = async () => {
        //confirm
        let channel = this.props.selectedChatChannel;
        let { senderId, receiverId } = channel.attributes;
        var userId = senderId === this.props.user.id ? receiverId : senderId;
        try {

            let response = await reportUser(userId, channel.uniqueName);
            if (response.data.success === true) {
                channel.leave();
                this.props.fetchReportedUsers()
                toastMsg("Reported this user", false);
            }
        } catch (error) {

        }
    }

    confirmReporting = async () => {
        showConfirmAlert("Confirm", "Are you sure, you want to report?", () => {
            this.reportUser();
        }, () => {
            //cancel
        })
    }

    blockUser = async () => {
        let channel = this.props.selectedChatChannel;
        let { senderId, senderName, senderProfileURL, receiverId, receiverName, receiverProfileURL, receiverTitle, senderTitle } = channel.attributes;
        var userId = senderId === this.props.user.id ? receiverId : senderId;
        try {

            let response = await blockUser(userId, channel.uniqueName);
            if (response.data.success === true) {
                this.props.fetchReportedUsers()
                toastMsg("User blocked successfully", false);
            }
        } catch (error) {

        }
    }

    unblockUser = async () => {

        let channel = this.props.selectedChatChannel;
        let { senderId, receiverId } = channel.attributes;
        var userId = senderId === this.props.user.id ? receiverId : senderId;
        try {

            let response = await unblockUser(userId);
            if (response.data.success === true) {
                this.props.fetchReportedUsers()
                toastMsg("User unblocked successfully", false);
            }
        } catch (error) {

        }
    }

    render() {
        let messagesContents = this.state.messages.map((msg, index) => {
            return this.displayMsg(msg, index);
        })
        return (
            <Oux>
                <div className="mesgs">
                    {this.props.selectedChatChannel &&
                        <ChannelDetail
                            isReported={this.state.isReported}
                            isBlocked={this.state.isBlocked}
                            channel={this.props.selectedChatChannel}
                            user={this.props.user}
                            reportUser={this.confirmReporting}
                            blockUser={this.blockUser}
                            unblockUser={this.unblockUser}
                            {...this.props} />}
                    <div className="msg_history" id="boxscroll-2">
                        {messagesContents}
                        {/* <div ref={this.messagesEndRef} /> */}
                        <div style={{ float: "left", clear: "both" }}
                            ref={(el) => { this.messagesEndRef = el; }}></div>
                    </div>
                    {
                        !this.state.isReported && !this.state.isBlocked ?
                            <div className="type_msg">
                                <div className="input_msg_write">
                                    <textarea type="text" className="write_msg"
                                        name="inputValue"
                                        placeholder="Type a message"
                                        value={this.state.inputValue}
                                        onChange={this.handleChange}
                                        onKeyDown={this.keyPress}
                                        onKeyUp={this.keyRelease} />
                                    <button className="msg_send_btn theme_btn theme_primary bdr_r30" type="button" onClick={this.sendMsg}>Send</button>
                                </div>
                            </div> :
                            null
                    }
                </div>
            </Oux>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        service: state.miscReducer.service,
        user: state.authReducer.user,
        receiver: state.userReducer.receiver,
        selectedChatChannel: state.userReducer.selectedChatChannel,
        blockedByMe: state.userReducer.blockedByMe,
        blockedMe: state.userReducer.blockedMe,
        reportedByMe: state.userReducer.reportedByMe,
        shareURL: state.miscReducer.shareURL,
        isSharingViaMsg: state.miscReducer.isSharingViaMsg,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchReportedUsers: () => dispatch(actions.fetchReportedUsers()),
        updatedIsSharingViaMsg: (isSharingViaMsg) => dispatch(actions.updatedIsSharingViaMsg(isSharingViaMsg))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatThread);


const ChannelDetail = (props) => {
    let { senderId, senderName, senderProfileURL, receiverId, receiverName, receiverProfileURL, receiverTitle, senderTitle } = props.channel.attributes;
    var displayName = senderId === props.user.id ? receiverName : senderName;
    var profilePic = senderId === props.user.id ? receiverProfileURL : senderProfileURL;
    profilePic = profilePic ? profilePic : "/custom_images/user.png"
    var title = senderId === props.user.id ? receiverTitle ?? "" : senderTitle ?? "";

    var actionContent = null;
    if (!props.isReported) {
        if (!props.isBlocked) {
            actionContent = (
                <>
                    <button onClick={props.blockUser} className="theme_btn theme_primary text-uppercase ml-2" type="button">Block</button>
                    <button onClick={props.reportUser} className="theme_btn theme_btn_gray text-uppercase" type="button">Report</button>
                </>
            );
        } else {
            actionContent = (
                <><button onClick={props.unblockUser} className="theme_btn theme_primary text-uppercase ml-2" type="button">Unblock</button></>
            );
        }
    } else {
        actionContent = <h3 style={{ color: "red" }}>Reported and blocked!</h3>
    }

    return (
        <div className="media active_avatar align-items-center active_avatar_btns">
            <span className="avatar_c_50 mr-3">
                <img src={profilePic} alt={displayName} />
            </span>
            <div className="media-body ph_skils">
                <h5 className="mt-0">{displayName}</h5>
                <span>{title}</span>
            </div>
            <div className="actions_btns">
                {actionContent}
            </div>
        </div>
    )
}