import React, { Component } from "react";
import { connect } from "react-redux";
import TimeAgo from "react-timeago";
import en from "react-timeago/lib/language-strings/en";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import ChatThread from "./ChatThread";
import * as actions from "../../redux/actions";
import { refreshToken } from '../../api/authAPI';
import SpinnerLoader from '../../components/UI/SpinnerLoader/SpinnerLoader'
import $ from 'jquery';
import './Messages.css'
import { SubscriptionStatus } from "../../utility/constants/constants";
import storage from "../../utility/storage";

const Chat = require("twilio-chat");
var jwt = require('jsonwebtoken');

class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      isLoading: false,
      subscribedChannels: [],
    };
    this.channels = [];
    this.chatClient = null;
    this.requestedChatChannelName = null;
  }

  getChannelByUniqueName = (chatClient, channelId) => {
    chatClient
      .getChannelByUniqueName(channelId)
      .then((channel) => {
        channel.join();
      })
      .catch((error) => { });
  };

  createChannel = (channelName, friendlyName) => {
    let senderName =
      this.props.user.first_name + " " + this.props.user.last_name ?? "";
    let senderProfilePic = this.props.user.profiles[0].photo_urls["medium"]
      ? this.props.user.profiles[0].photo_urls["medium"]
      : null;
    let receiverId = this.props.receiver.user_id;
    let receiverName = this.props.receiver.name ? this.props.receiver.name : this.props.receiver.first_name + " " + this.props.receiver.last_name ?? "";
    let receiverProfilePic = this.props.receiver.photo_urls && this.props.receiver.photo_urls["medium"]
      ? this.props.receiver.photo_urls["medium"]
      : null;
    ;
    this.chatClient
      .createChannel({
        uniqueName: channelName,
        friendlyName: friendlyName,
        attributes: {
          senderId: this.props.user.id,
          senderName: senderName,
          senderProfileURL: senderProfilePic,
          senderTitle: this.props.user.profiles[0].title ?? "",
          receiverId: receiverId,
          receiverName: receiverName,
          receiverProfileURL: receiverProfilePic,
          receiverTitle: this.props.receiver.title ?? "",
        },
      })
      .then(function (channel) {
        ;
        console.log("Created channel:");
        console.log(channel);
        channel.join();
      })
      .catch((error) => {
        ;
        if (error.code === 50307) {
          // already created
          this.getChannelByUniqueName(this.chatClient, channelName);
        }
      });
  };

  getAllPublicChannels = (paginator) => {
    const that = this;
    var channels = [...this.channels];

    var user = this.props.user;
    const self = this;
    for (var i = 0; i < paginator.items.length; i++) {
      const channel = paginator.items[i];
      if (channel.uniqueName && channel.uniqueName.includes(user.id)) {
        channels = [...channels, channel];
      }
      console.log("Channel: " + channel.friendlyName);
    }
    this.channels = channels;
    if (paginator.hasNextPage) {
      paginator.nextPage().then(function (newpaginator) {
        that.getAllPublicChannels(newpaginator);
      });
    } else {
      if (this.channels.length === 0) {
        self.setState((prevState) => ({ isLoading: false }));
      }
      this.channels.map((item, i) => {
        console.log("user subscribed channels");
        console.log(item.uniqueName);
        this.chatClient
          .getChannelByUniqueName(item.uniqueName)
          .then((channel) => channel)
          .then((channel) => {
            console.log(channel);
            if (channel.status !== "invited") {
              console.log("channel.status:" + channel.status);
              self.setState(
                {
                  isLoading: false,
                  recipients: [...self.state.subscribedChannels, channel],
                },
                () => {
                  this.messageAdded(null);
                }
              );
            }
            return channel.join().catch(() => { });
          });
      });
    }
  };


  componentWillMount = () => {
    this.props.fetchReportedUsers();
  }

  componentDidMount = () => {
    let quickstart = {
      ...this.props.quickstartItems,
      respond_to_messages: true,
    };
    this.props.updateQuickstartItems(quickstart)
    storage.set('quickstart', quickstart);
    this.props.fetchCurrentUser();
    if (this.props.twilio_token) {
      this.initChat(this.props.twilio_token);
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (!prevProps.twilio_token && this.props.twilio_token) {

      this.initChat(this.props.twilio_token);
    }

    if (!this.state.isLoading) {
      var chatListSection = document.getElementById("chat_list");
      if (chatListSection) {
        this.addScroller("chat_list")
      }
      var chatBoxSection = document.getElementById('chat_box')
      console.log(chatBoxSection, "chatBoxSection")
      if (chatBoxSection) {
        this.addScroller("chat_box")
      }
    }
  }

  componentWillUnmount = () => {
    this.props.updateSelectedChatChannel(null);
  }

  addScroller = (section) => {
    // if (section === "chat_box") {
    //   window.$.mCustomScrollbar.defaults.scrollButtons.enable = true; //enable scrolling buttons by default
    //   window.$.mCustomScrollbar.defaults.axis = "y"; //enable 2 axis scrollbars by default
    //   // window.$("#boxscroll-1").mCustomScrollbar();
    //   window.$("#boxscroll-2").mCustomScrollbar();
    //   window.$("#boxscroll-3").mCustomScrollbar({ theme: "rounded-dark" });
    //   window.$("#content-i2d").mCustomScrollbar({ theme: "inset-2-dark" });
    //   window.$("#content-i3d").mCustomScrollbar({ theme: "inset-3-dark" });
    //   window.$("#content-3d").mCustomScrollbar({ theme: "3d" });
    // }
    // if (section === "chat_list") {
    //   window.$.mCustomScrollbar.defaults.scrollButtons.enable = true; //enable scrolling buttons by default
    //   window.$.mCustomScrollbar.defaults.axis = "y"; //enable 2 axis scrollbars by default
    //   window.$("#boxscroll-1").mCustomScrollbar();
    //   // window.$("#boxscroll-2").mCustomScrollbar();
    //   window.$("#boxscroll-3").mCustomScrollbar({ theme: "rounded-dark" });
    //   window.$("#content-i2d").mCustomScrollbar({ theme: "inset-2-dark" });
    //   window.$("#content-i3d").mCustomScrollbar({ theme: "inset-3-dark" });
    //   window.$("#content-3d").mCustomScrollbar({ theme: "3d" });
    // }
  }

  receiverID = (channel) => {
    let {
      senderId,
      receiverId
    } = channel.attributes;
    let currentUserId = this.props.user.id;
    return currentUserId === senderId ? parseInt(receiverId) : parseInt(senderId);
  }

  isReported = (channel) => {
    return this.props.reportedByMe.filter(item => parseInt(item.other_user_id) === this.receiverID(channel)).length > 0;
  }

  isBlocked = (channel) => {
    return this.props.blockedByMe.filter(item => parseInt(item.other_user_id) === this.receiverID(channel)).length > 0;
  }

  toggleChat = () => {
    // $("#toggle_btn_chat").click(function () {
    $(".inbox_chat_xs").toggle("slow");
    // });
  }

  initChat = async (twilio_token) => {

    this.setState({
      isLoading: true
    })
    var decodedToken = jwt.decode(twilio_token, { complete: true });
    var dateNow = new Date();
    try {
      if (decodedToken.payload.exp < (dateNow.getTime() / 1000)) {
        //is expired - refresh the token and reinitialize
        let response = await refreshToken();
        let twilio_token = response.data.twilio_token;
        if (response.data.success === true) {
          this.props.storeSessionData(response.data)
        }
        this.initChat(twilio_token);
        return;
      }
      let chatClient = await Chat.Client.create(twilio_token);
      // let chatClient = await Chat.Client.create(twilio_token);
      this.chatClient = chatClient;
      this.registerChannelSusbcription();
      let paginator = await chatClient.getPublicChannelDescriptors();
      this.getAllPublicChannels(paginator);
      ;
      if (this.props.receiver) {
        let recieverID = this.props.receiver.user_id ? this.props.receiver.user_id : this.props.receiver.id;
        let channelName =
          this.props.user.id + "__" + recieverID
        let friendlyName =
          this.props.user.first_name + "__" + this.props.receiver.first_name;
        this.createChannel(channelName, friendlyName);
      } else {
        this.setState({
          isLoading: false
        })
      }
    } catch (error) {

      console.log("chat error:" + error);
    }
  };

  messageAdded = (message) => {
    console.log(message);
    const self = this;
    var recipients = [...this.state.subscribedChannels];
    if (message !== null) {
      recipients.find((o, i) => {
        if (o.sid === message.channel.sid) {
          this.chatClient
            .getChannelByUniqueName(o.uniqueName)
            .then((channel) => {
              recipients[i] = channel;
              recipients.sort(function (a, b) {
                if (self.isReported(a) || self.isBlocked(a)) return 1
                if (self.isBlocked(b) || self.isBlocked(b)) return -1

                if (a.lastMessage === undefined) return -1;
                if (b.lastMessage === undefined) return 1;
                var keyA = new Date(a.lastMessage.timestamp),
                  keyB = new Date(b.lastMessage.timestamp);
                if (keyA < keyB) return 1;
                if (keyA > keyB) return -1;
                return 0;
              });
              self.setState((prevState) => ({
                subscribedChannels: recipients,
              }));
            });
          return true;
        }
      });
    } else {
      recipients.sort(function (a, b) {
        if (self.isReported(a) || self.isBlocked(a)) return 1
        if (self.isBlocked(b) || self.isBlocked(b)) return -1

        if (a.lastMessage === undefined) return -1;
        if (b.lastMessage === undefined) return 1;
        var keyA = new Date(a.lastMessage.timestamp),
          keyB = new Date(b.lastMessage.timestamp);

        if (keyA < keyB) return 1;
        if (keyA > keyB) return -1;
        return 0;
      });
      self.setState((prevState) => ({ subscribedChannels: recipients }));
      if (!this.props.receiver) {
        this.props.updateSelectedChatChannel(recipients[0]);
      }
      console.log(this.state.subscribedChannels);
    }
  };

  probableChannelIDs = () => {
    let receiver = this.props.receiver;
    let user = this.props.user;

    let probbable1 = receiver.user_id + "__" + user.id;
    let probbable2 = user.id + "__" + receiver.user_id;
    return [probbable1, probbable2]
  }


  registerChannelSusbcription = () => {
    // Join a previously created channel
    const self = this;
    this.chatClient.on("channelJoined", function (channel) {
      var channels = [...self.state.subscribedChannels];

      //if channel already created use that
      if (self.props.receiver && self.probableChannelIDs().includes(channel.uniqueName)) {
        self.props.updateSelectedChatChannel(channel);
        channels.unshift(channel);
      } else {
        channels.push(channel);
      }

      console.log("Joined channel " + channel.friendlyName);
      self.setState((prevState) => ({ subscribedChannels: channels }));
    });

    this.chatClient.on("channelInvited", function (channel) {
      console.log("Invited channel " + channel.friendlyName);
      var recipients = [...self.state.subscribedChannels];
      var isFound = false;
      recipients.find((o, i) => {
        if (o.sid === channel.sid) {
          isFound = true;
          return true;
        }
      });
      if (!isFound) {
        channel.join();
        var channels = [...self.state.subscribedChannels, channel];
        self.setState((prevState) => ({ subscribedChannels: channels }));
      }
    });

    this.chatClient.on("messageAdded", this.messageAdded);
  };

  onChatThreadClickHandler = (channel) => {
    this.props.updateSelectedChatChannel(channel);
  };

  displayChannelThread = (channel) => {
    const formatter = buildFormatter(en);
    let {
      senderId,
      senderName,
      senderProfileURL,
      receiverId,
      receiverName,
      receiverProfileURL,
    } = channel.attributes;
    let updatedAt = channel.dateUpdated;
    let unread = 0;
    var displayName = senderId === this.props.user.id ? receiverName : senderName;
    var profilePic = senderId === this.props.user.id ? receiverProfileURL : senderProfileURL;
    profilePic = profilePic ? profilePic : "/custom_images/user.png";
    if (channel.lastMessage) {
      if (channel.lastMessage.index - channel.lastConsumedMessageIndex !== 0) {
        unread = channel.lastMessage.index - channel.lastConsumedMessageIndex;
      }
    }

    let chatClass = this.props.selectedChatChannel && channel.sid === this.props.selectedChatChannel.sid ? "chat_list active_chat" : "chat_list";
    let chatActiveColor = this.props.selectedChatChannel && channel.sid === this.props.selectedChatChannel.sid ? "text-white" : "";

    return (
      <a className={chatClass} key={channel.sid} id="chat_list" onClick={() => { this.onChatThreadClickHandler(channel) }}>
        <div className="chat_people">
          <div className="chat_img">
            {" "}
            <img src={profilePic} alt="" />{" "}
          </div>
          <div className="chat_ib">
            <h5 className={chatActiveColor}>
              {displayName}
              {/* {unread > 0 ? <span className="number_badge">{unread}</span> : null} */}
              {channel.lastMessage ? (
                <span className="chat_date">
                  <TimeAgo
                    date={channel.lastMessage.timestamp}
                    formatter={formatter}
                  />
                </span>
              ) : (
                <span className="chat_date">
                  <TimeAgo date={updatedAt} formatter={formatter} />
                </span>
              )}
            </h5>
          </div>
        </div>
      </a>
    );
  };

  render() {

    let chatThreads = this.state.subscribedChannels.map((channel, i) => {
      return this.displayChannelThread(channel);
    });
    if (this.state.isLoading) {
      return (
        <section class="ph_main_sec pt_83 chat_sec">
          <div class="container-fluid theme_px_50">
            <div class="ph_empty_message ph_empty_msg" role="alert">
              <SpinnerLoader />
            </div>
          </div>
        </section>
      );
    } else {
      if (this.state.subscribedChannels.length === 0) {
        return (
          <div class="ph_wrp">
            <section class="ph_main_sec pt_83 chat_sec">
              <div class="container-fluid theme_px_50">
                <div class="ph_empty_message ph_empty_msg" role="alert">
                  <img class="ph_empty_image" src="/images/thumbnails/messages_empty.png" alt="Messages are empty" />
                  <div class="ph_empty_text">There are no Messages!</div>
                </div>
              </div>
            </section>
          </div>
        );
      } else {
        return (
          <section className="ph_main_sec pt_83 chat_sec">
            <div className="container-fluid theme_px_50">
              <div className="messaging">
                <div className="inbox_msg">
                  <div className="inbox_people">
                    <a
                      href="javascript:void()"
                      id="toggle_btn_chat"
                      className="theme_btn theme_primary"
                      onClick={this.toggleChat}
                    >
                      Active Chats <i className="fa fa-plus"></i>{" "}
                    </a>
                    <div className="inbox_chat inbox_chat_xs" id="boxscroll-1">
                      {chatThreads}
                    </div>
                  </div>
                  {this.props.selectedChatChannel && <ChatThread addScroller={this.addScroller} />}
                </div>
              </div>
            </div>
          </section>
        );
      }
    }
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.authReducer.user,
    twilio_token: state.authReducer.twilio_token,
    receiver: state.userReducer.receiver,
    selectedChatChannel: state.userReducer.selectedChatChannel,
    blockedByMe: state.userReducer.blockedByMe,
    blockedMe: state.userReducer.blockedMe,
    reportedByMe: state.userReducer.reportedByMe,
    quickstartItems: state.authReducer.quickstartItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCurrentUser: () => dispatch(actions.fetchCurrentUser()),
    updateSelectedChatChannel: (channel) => dispatch(actions.updateSelectedChatChannel(channel)),
    storeSessionData: (sessionData) => dispatch(actions.storeSessionData(sessionData)),
    fetchReportedUsers: () => dispatch(actions.fetchReportedUsers()),
    updateQuickstartItems: quickstart => dispatch(actions.updateQuickstartItems(quickstart)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
