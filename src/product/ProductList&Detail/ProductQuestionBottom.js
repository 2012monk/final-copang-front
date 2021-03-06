import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductQuestionModal from './ProductQuestionModal';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import BusinessIcon from '@material-ui/icons/Business';


const ProductQuestionBottom = (props) => {

    const [refresh, setRefresh] = useState(0)

    // const onClickReply = (idx, row) => {
    //     Question[idx].check = !Question[idx].check
    //     setRefresh(prev => prev + 1)
    // }

    const onClickFixQuestion = (idx, row) => {
        Question[idx].check = !Question[idx].check
        setRefresh(prev => prev + 1)
    }


    useEffect(() => { }, [refresh])

    const [questionFix, setQuestionFix] = useState({
        questionFix: ""
    })

    const handleChange4 = (e) => {
        const { name, value } = e.target;
        console.log(e.target);
        setQuestionFix({ fixQuestion, [name]: value })
    }

    const [replyContent, setReplyContent] = useState({
        replyContent: ""
    })

    const handleChange3 = (e) => {
        const { name, value } = e.target;
        console.log(e.target);
        setReplyContent({ replyContent, [name]: value })
    }

    const [optionValue, setOptionValue] = useState({
        optionValue: ""
    })

    const handleChange2 = (e) => {
        setOptionValue(ProductOne.itemDetailFormList[e.target.selectedIndex].optionValue);
        console.log(optionValue)
    }

    const [content, setContent] = useState({
        content: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(e.target);
        setContent({ content, [name]: value });
    };


    let itemId = props.match.params.itemId;
    const [Question, setQuestion] = useState([]);
    useEffect(() => {
        const res = async () => {
            const result = await axios.get("https://alconn.co/api/inquiry/" + itemId + "/item");
            for (let i = 0; i < result.data.data.length; i++) {
                result.data.data[i].check = false;
            }
            setQuestion(result.data.data)
        }
        res();
    }, [])
    const [ProductOne, setProductOne] = useState([]);
    useEffect(() => {
        const res = async () => {
            const result = await axios.get("https://alconn.co/api/item/list/itemid=" + itemId);
            setProductOne(result.data.data)
        }
        res();
    }, [itemId])
    const [modalOpen, setModelOpen] = useState(false);

    const openModal = () => {
        setModelOpen(true);
    }

    const closeModal = () => {
        setModelOpen(false);
    }

    const addQuestion = (Question) => {
        const axiosAddQuestion = async () => {
            const questionData = {
                "clientId": localStorage.getItem("userId"),
                "clienetName": Question.clientName,
                "itemId": itemId,
                "content": content.content,
                "itemDetailId": ProductOne.itemDetailFormList && ProductOne.itemDetailFormList[0].itemDetailId,
                "optionValue": optionValue.optionValue,
                "optionName": ProductOne.itemDetailFormList && ProductOne.itemDetailFormList[0].optionName,
                "itemName": ProductOne.itemName
            }
            await axios.post("https://alconn.co/api/inquiry", questionData);
        }
        axiosAddQuestion();
        alert("??????????????? ???????????????.")
    }

    //???????????? API
    // const addReply = (idx) => {
    //     const axiosAddReply = async () => {
    //         const replyData = {
    //             "inquiry": Question[idx].inquiryId,
    //             "content": replyContent.replyContent,
    //         }
    //         await axios.post("https://alconn.co/api/inquiry/" + Question[idx].inquiryId + "/reply", replyData);
    //         const result = await axios.get("https://alconn.co/api/inquiry/" + itemId + "/item");
    //         setQuestion(result.data.data);
    //         setRefresh(prev => prev + 1)
    //     }
    //     axiosAddReply();

    //     alert("??????????????? ???????????????.");

    // }

    const fixQuestion = (idx) => {
        const axiosfixQuestion = async () => {
            const fixQuestionData = {
                "content": questionFix
            }
            await axios.put("https://alconn.co//api/inquiry/" + Question[idx].inquiryId, fixQuestionData);
        }
        axiosfixQuestion();
        alert("??????????????? ?????????????????????.")
    }
    return (
        <div className="product-question-desc">
            <div >
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <div className="product-question-desc-header">
                    <div style={{ fontWeight: 'bold', fontSize: '1.5em', marginTop: '3%' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        ????????????<span className="product-question-span"><button type="button" className="product-question-button" onClick={openModal}>????????????</button></span></div>
                    <ProductQuestionModal open={modalOpen} close={closeModal} header="?????? ??????">
                        <table style={{ width: '100%', height: '90%', border:'1px solid #777777',textAlign:'center'}}>
                            <tbody className="question-tbody">
                                <tr style={{ border:'1px solid #777777'}}>
                                    <th style={{width:'10%',  border:'1px solid #777777'}}>????????????</th>
                                    <td style={{ border:'1px solid #777777'}}>
                                        <div style={{textAlign:'left'}}>
                                            <div>
                                                {ProductOne.itemDetailFormList && ProductOne.itemDetailFormList[0].optionName} :
                                                <select onChange={(e)=>handleChange2(e)}>
                                                    {
                                                        ProductOne.itemDetailFormList && ProductOne.itemDetailFormList.map((row, idx) => {
                                                            return (
                                                                <option name="optionValue" key={idx} row={row} value={row.optionValue}>
                                                                    {row.optionValue}
                                                                </option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ border:'1px solid #777777'}}>
                                    <th style={{ border:'1px solid #777777'}}>?????????</th>
                                    <td style={{textAlign:'left'}}>
                                        <div>?????????.</div>
                                    </td>
                                </tr>
                                <tr style={{ border:'1px solid #777777'}}>
                                    <th style={{ border:'1px solid #777777'}}>????????????</th>
                                    <td>
                                        <input type="text" row="2" style={{ width:'100%',height:'100%'}} name="content" value={content.content} onChange={handleChange}></input>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div style={{ textAlign: 'center',marginTop:'30px' }}>
                            <button type="submit" className="question-submit-btn" onClick={addQuestion}><span>??????</span></button>
                            <button type="button" className="question-cancel-btn" onClick={closeModal}><span>??????</span></button>
                        </div>
                    </ProductQuestionModal>
                    <br /><br />
                    <ul className="product-question-desc">
                        <li>
                            ????????? ????????? ??????/????????? ???????????? ?????????????????? ?????? ???????????????.
                        </li>
                        <li>
                            ???????????? ??? ?????????????????? ?????? ????????? ??????, ?????? ?????? ???????????? ????????????.
                        </li>
                        <li>
                            ??????, ?????????, ??????/?????? ??? ?????? ??? ?????? ?????? ????????? ?????? ?????? ????????? ???????????? ??? 1:1 ??????????????? ??????????????????.
                        </li>
                        <li>
                            "?????? ?????? ??????"??? ???????????? ???, ??????, ?????????, ??????, ??????, ?????? ?????? ?????? ?????? ?????? ??????, ????????????, ?????? ?????? ????????? ????????? ??? ????????????.
                        </li>
                        <li>
                            ?????? ?????????????????? ????????????, ?????? ?????? ??? ???????????? ????????? ??????????????? ?????? ????????? ???????????????.
                        </li>
                    </ul>
                    <div className="product-question-body-wrap">
                        <div className="product-question-body">
                            {
                                Question.length !== 0 ?
                                    Question && Question.map((row, idx) => {
                                        return (
                                            <div>
                                                <div className="product-question-body2" row={row} key={idx}>
                                                    <strong><span style={{ backgroundColor: '#777777', color: 'white' }}>??????</span>&nbsp;<AccountCircleIcon></AccountCircleIcon>&nbsp;{row.clientName}</strong><span className="product-question-writeday">{row.registerDate}</span><br />
                                                    <div style={{ fontSize: '10pt', color: '#777' }}>{row.itemName},{row.optionName},{row.optionValue}</div><br/>
                                                    <div style={{height:'40px'}}>{row.content}</div>
                                                    {/* <div><button onClick={() => onClickReply(idx, row)} style={{ border: 'none', backgroundColor: 'white', color: '#346AFF' }} >????????????</button>&nbsp;&nbsp;<button onClick={() => onClickFixQuestion(idx, row)} style={{ border: 'none', backgroundColor: 'white', color: 'green' }}>??????</button></div> */}
                                                    {/* {
                                                        row.check ? <div><textarea name="replyContent" onChange={handleChange3} value={replyContent.replyContent}></textarea><button onClick={() => addReply(idx)} style={{ border: 'none', backgroundColor: 'white', color: '#346AFF' }}>????????????</button></div> : null
                                                    }
                                                    {
                                                        row.check ? <div><textarea name="questionFix" value={questionFix.questionFix} placeholder={row.content} onChange={handleChange4}></textarea><button onClick={() => fixQuestion(idx)} style={{ border: 'none', backgroundColor: 'white', color: 'green' }}>????????????</button></div> : null */}
                                                    {/* } */}
                                                    {
                                                        row.reply && <div className="question-reply-wrap"><br></br><strong><span style={{ backgroundColor: '#346AFF', color: 'white' }}>??????</span>&nbsp;<BusinessIcon></BusinessIcon>&nbsp;{row.reply.sellerName}</strong><span className="product-question-writeday">{row.reply.registerDate}</span><br /><br />
                                                            <div>{row.reply.content}</div><br />
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        );
                                    }) : <div style={{ fontSize: '30pt', width: '100%', textAlign: 'center', borderBottom: '2px solid #555555', height: '300px', lineHeight: '300px' }}>??????????????? ????????????.</div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductQuestionBottom;