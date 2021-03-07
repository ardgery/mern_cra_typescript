"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processMessage = exports.JWT_SECRET_TOKEN = void 0;
exports.JWT_SECRET_TOKEN = 'dsfdkjshfdkjshf3453sdadsaass5dsasad34234@!#%@&343543';
function processMessage(payload) {
    try {
        return JSON.parse(payload);
    }
    catch (error) {
        return null;
    }
}
exports.processMessage = processMessage;
