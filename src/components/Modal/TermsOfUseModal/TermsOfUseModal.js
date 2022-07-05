import React, { useState } from 'react'
import { routes } from '../../../utility/constants/constants';
import { withRouter } from 'react-router-dom';
import { pdfjs } from 'react-pdf';
import './TermsOfUseModal.css'
import 'react-pdf/dist/Page/AnnotationLayer.css';
import { Document, Page } from 'react-pdf';
import { useEffect } from 'react';
import $ from 'jquery'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const TermsOfUseModal = props => {
    const [numPages, setNumPages] = useState(0)
    const [pageNumber, setPageNumber] = useState(1)
    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    }

    const calculatePercent = (percent, num) => {
        return (percent / 100) * num;
    }

    const checkScrollEnd = (event) => {
        let bottomHeightOne = Math.floor(event.target.scrollHeight - event.target.scrollTop)
        let bottomHeightTwo = Math.round(event.target.scrollHeight - event.target.scrollTop)
        let clientHeight = Math.ceil(calculatePercent(190, event.target.clientHeight))
        console.log(clientHeight, "90%clientHeight")
        console.log(bottomHeightOne, bottomHeightTwo, "oneTwo")
        if (bottomHeightOne === event.target.clientHeight || bottomHeightTwo === event.target.clientHeight) {
            setPageNumber(numPages)
        }else if((bottomHeightOne <= clientHeight && bottomHeightOne >= event.target.clientHeight) || (bottomHeightTwo <= clientHeight && bottomHeightOne >= event.target.clientHeight)){
            setPageNumber(numPages)
        }
    }

    return (
        <div className="modal fade" data-backdrop="static" id="terms_of_use_modal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg" role="document">
                <div onScroll={(event) => checkScrollEnd(event)} id="terms_of_use_modal" className="modal-content terms_of_use_modal_content">
                    <div className="modal-body text-center">
                        {/* <a href="javascript:void();" type="button" className="close p-0 m-0 ml-auto d-block" data-dismiss="modal" aria-label="Close">
                            <img src="/images/icons/icn_close_gray.svg" alt="Icon Close" />
                        </a> */}
                        {/* {props.termsOfUse ? <embed src={props.termsOfUse} width="100%" height="400px" /> : null} */}
                        {/* {
                            props.termsOfUse
                                ? <div>
                                    <Document
                                        file='/custom_docs/generate_document.php.pdf'
                                        onLoadSuccess={onDocumentLoadSuccess}
                                        className="pdf_document_container"
                                    >
                                        {
                                            Array.from(
                                                new Array(numPages),
                                                (el, index) => (
                                                    <Page
                                                        className="pdf_page_container"
                                                        key={`page_${index + 1}`}
                                                        pageNumber={index + 1}
                                                    />
                                                ),
                                            )
                                        }
                                    </Document>
                                </div>
                                : null
                        } */}
                        <div>
                            <Document
                                file={props.termsOfUse}
                                onLoadSuccess={onDocumentLoadSuccess}
                                className="pdf_document_container"
                            >
                                {
                                    Array.from(
                                        new Array(numPages),
                                        (el, index) => (
                                            <Page
                                                className="pdf_page_container"
                                                key={`page_${index + 1}`}
                                                pageNumber={index + 1}
                                            />
                                        ),
                                    )
                                }
                            </Document>
                        </div>
                    </div>
                    <div class="modal-footer terms_of_use_modal_footer">
                        <h6 style={{fontWeight: 600, background: 'yellow'}}>Read to the end then click 'Agree'</h6>
                        <div className="btn_block">
                            <a data-dismiss="modal" href="javascript:void(0)" onClick={() => props.toggleTermsAgreedFromModal(false)} className="form_link ft_Weight_600 ph_underline">Disagree</a>
                            <a data-dismiss="modal" href="javascript:void(0)" onClick={() => props.toggleTermsAgreedFromModal(true)} className={pageNumber === numPages ? "form_link ft_Weight_600 ph_underline ml-2" : "form_link ft_Weight_600 ph_underline ml-2 disabled"}>Agree</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(TermsOfUseModal)