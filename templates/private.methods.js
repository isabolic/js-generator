

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
        this.options.$container.trigger(evt, [evtData]);
        this.options.$element.trigger(evt, [evtData]);
        $(this).trigger(evt + "." + this.apexname, [evtData]);
    };

    /**
     * [intervalFlag PRIVATE call passed function repeatedly "fnIntervat", stop only when flagForClear is set to true ]
     * @param  function fnIntervat   function for repeatedly call
     * @param  property flagForClear key prop. on this scope
     * @param  number   timer        timer, def. 200
     */
    var intervalFlag = function  intervalFlag(fnIntervat, flagForClear, timer){
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
