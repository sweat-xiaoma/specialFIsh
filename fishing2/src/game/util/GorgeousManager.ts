class GorgeousManager {
    static _state = true;
    static initState = function(t) {
        this._state = t
    };
    static setState = function(t) {
        this._state = t,
        _Notification_.send(NotifyEnum.UPDATE_GORGEOUS_STATE)
    };
    static getState = function() {
        return this._state
    };
} 