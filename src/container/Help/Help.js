import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../redux/actions/index'
import $ from 'jquery'
import SpinnerLoader from '../../components/UI/SpinnerLoader/SpinnerLoader'

class Help extends Component {

    state = {
        currentlyOpenedFAQ: null
    }

    componentDidMount() {
        this.props.fetchFAQ()
    }

    toggleOtherFaqs = (selected_faq) => {
        this.props.faqs.map((faq, index) => {
            if (faq.id !== selected_faq.id) {
                $(`#faq_${faq.id}`).removeClass('show')
                $(`#question_${faq.id}`).addClass('collapsed')
            }
        })
    }

    render() {
        return (
            <section class="ph_main_sec pt_83 ph_filter_sec about_sec ph_banner_sec pb-0">
                <div class="container-fluid theme_px_60">
                    <div class="quiz_head">
                        <h1>Frequently Asked Questions</h1>
                        <p>Need help? Be sure to visit our support forums for answers to your questions!</p>
                    </div>
                    <div class="quiz_accordion">
                        <div id="accordion">
                            {
                                this.props.faqs && this.props.faqs.length > 0
                                    ? this.props.faqs.map((faq, index) => {
                                        return (
                                            <div key={faq.id} className="card">
                                                <div
                                                    data-toggle="collapse"
                                                    data-target={`#faq_${faq.id}`}
                                                    id={`question_${faq.id}`}
                                                    onClick={() => this.toggleOtherFaqs(faq)}
                                                    className="card-header collapsed">
                                                    <a className="card-title">
                                                        {faq.question}
                                                    </a>
                                                </div>

                                                <div
                                                    id={`faq_${faq.id}`}
                                                    className="collapse">
                                                    <div className="card-body">
                                                        <p>{faq.answer}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                    : <div className="ph_empty_message" role="alert">
                                        <SpinnerLoader />
                                    </div>
                            }
                        </div>
                    </div>
                    <h4 style={{ marginBottom: "25px", textAlign: 'center' }}>Still need help? Contact <a href="mailto:support@partnerhere.com" target="_blank" style={{ color: '#0e55a5' }}>support@partnerhere.com</a></h4>
                </div>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        faqs: state.miscReducer.faqs
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchFAQ: () => dispatch(actions.fetchFAQ())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Help)