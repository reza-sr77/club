import React from "react";


const PageLoading = () => {
    return (
        <div className="pageLodingBox">
            <div className="pageLoadingContent">
                <div className="pageLoadingWaiting">
                    <img src={require('./../../assets/images/weight.png')} alt="" />
                    <p>درخواست شما در حال ارسال است، لطفا منتظر بمانید</p>
                </div>
            </div>
        </div>
    )
}

export default PageLoading