import React from "react";

const yellowMsg = () => {
    return(
        <div class="flex bg-yellow-100 rounded-lg p-4 mb-4 text-sm text-yellow-700" role="alert" dismissable>
            <div>
                <span class="font-medium">Warning alert!</span> Change a few things up and try submitting again.
            </div>
        </div>
    );
};

export default yellowMsg;