import React from "react";

const GreenMsg = () => {
    return(
        <div class="flex bg-green-100 rounded-lg p-4 mb-4 text-sm text-green-700" role="alert" dismissable>
             <div>
                <span class="font-medium">Success alert!</span> Change a few things up and try submitting again.
            </div>
        </div>
    );
};

export default GreenMsg;