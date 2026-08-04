import "./TooltipPopup.css";

function TooltipPopup({
    show,
    message,
    type = "success",
}) {

    if (!show) {
        return null;
    }

    return (

        <div
            className={`tooltip-popup ${type}`}
        >

            {message}

        </div>

    );

}

export default TooltipPopup;