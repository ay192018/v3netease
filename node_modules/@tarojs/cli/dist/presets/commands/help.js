"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const helper_1 = require("@tarojs/helper");
exports.default = (ctx) => {
    ctx.registerCommand({
        name: 'help',
        synopsisList: [
            'taro help [cmd]'
        ],
        fn({ _ }) {
            return __awaiter(this, void 0, void 0, function* () {
                const cmd = _[1];
                if (!cmd)
                    return console.log(helper_1.chalk.yellow('用法：taro help [cmd]，cmd 不存在！请输入需要查看帮助的命令名称。'));
                ctx.ctx.runHelp(cmd);
            });
        }
    });
};
//# sourceMappingURL=help.js.map