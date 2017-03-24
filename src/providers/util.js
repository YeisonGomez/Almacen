var Util = (function () {
    function Util(toastCtrl) {
        this.toastCtrl = toastCtrl;
    }
    Util.prototype.presentToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
    };
    return Util;
}());
export { Util };
//# sourceMappingURL=util.js.map