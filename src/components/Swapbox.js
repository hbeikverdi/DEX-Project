const Swapbox = (props) => {
    return (
        <div className="swapbox">
            <div className="swapbox_select token_select" id="from_token_select">
                <img className="token_image" src={props.imgPath} alt={props.coin} width="30" height="30" id="from_token_img"/>
                <span id="from_token_text"></span>
                    {props.coin}
             </div>
                <div className="swapbox_select">
                 <input className="number form-control" placeholder="amount" id="from_amount"/>
                </div>
        </div>
    )};
 export default Swapbox;