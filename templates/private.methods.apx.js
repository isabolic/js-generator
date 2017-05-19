
    /**
     * [setApxItemVal PRIVATE set apex item value on backend]
     * @param string  val      value
     * @param object  prmObj   object params
     */
    var apxAjaxReq = function apxAjaxReq(val, prmObj, ){
        var params, promise;

        xDebug.call(this, arguments.callee.name, arguments);


        params = $.extend(true, {
                    p_flow_id      : $("#pFlowId").val(),
                    p_flow_step_id : $("#pFlowStepId").val(),
                    p_instance     : $("#pInstance").val(),
                    p_debug        : $("#pdebug").val(),
                    x01            : val,
                    p_request      : 'PLUGIN=' + this.options.ajaxIdentifier
                }, prmObj);

        promise = $.ajax({
                    type     : "POST",
                    url      : "wwv_flow.show",
                    data     : params,
                    dateType : "application/json",
                    async    : true
                }).done(function(data) {
                    xDebug.call(this, arguments.callee.name, arguments);
                }.bind(this))
                .fail(function(data) {
                    xDebug.call(this, arguments.callee.name, arguments);
                }.bind(this));

        return promise;
    };

    /**
     * [xDebug PRIVATE function for debug]
     * @param  string   functionName  caller function
     * @param  array    params        caller arguments
     */
    var xDebug = function xDebug(functionName, params){
        x.debug(this.jsName || " - " || functionName, params, this);
    };

    /**
     * [triggerEvent PRIVATE handler fn - trigger apex events]
     * @param String evt - apex event name to trigger
     */
    var triggerEvent = function triggerEvent(evt, evtData) {
        xDebug.call(this, arguments.callee.name, arguments);
        this.options.$apexElement.trigger(evt, [evtData]);
        $(this).trigger(evt + "." + this.apexInternalName, [evtData]);
    };

    /**
     * [intervalFlag PRIVATE call passed function repeatedly "fnIntervat", stop only when flagForClear is set to true ]
     * @param  function fnIntervat   function for repeatedly call
     * @param  property flagForClear key prop. on this scope
     * @param  number   timer        timer, def. 200
     */
    var intervalFlag = function intervalFlag(fnIntervat, flagForClear, timer){
        var interval;

        xDebug.call(this, arguments.callee.name, arguments);

        this[flagForClear] = false;

        interval = setInterval(function() {
            fnIntervat.call(this);

            if (this[flagForClear]) {
                clearInterval(interval);
            }
        }.bind(this), (timer || 200));
    };

    /**
     * [getMessage PRIVATE get message from apex.lang api, if apex.lang returns text that is the same sa code, return undefined]
     * @param  string code apex.lang.code
     * @return string      translate
     */
    var getMessage = function getMessage(code){
        xDebug.call(this, arguments.callee.name, arguments);

        var ret = apex.lang.getMessage(code);
        if (ret === code) {
            ret = undefined;
        }
        return ret;

    };
