'use script';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var link = 'https://jsonplaceholder.typicode.com/posts';
function request(url) {
    return __awaiter(this, void 0, void 0, function () {
        var result, json, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch(url)];
                case 1:
                    result = _a.sent();
                    return [4 /*yield*/, result.json()];
                case 2:
                    json = _a.sent();
                    return [2 /*return*/, json];
                case 3:
                    error_1 = _a.sent();
                    if (error_1 instanceof Error) {
                        return [2 /*return*/, error_1.message];
                    }
                    else {
                        return [2 /*return*/, 'Unexpected error'];
                    }
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function getPosts(action) {
    request(link)
        .then(function (users) { return action(users); })["catch"](function (error) { return handleError(error); });
}
function handleError(message) {
    window.alert(message);
}
var postsList = document.querySelector('.posts__list');
var form;
var buttonUpdate;
function initialRender(data) {
    var users = [];
    data.map(function (value) {
        var _a;
        if (users.find(function (user) { return user.userId === value.userId; })) {
            (_a = users.find(function (user) { return user.userId === value.userId; })) === null || _a === void 0 ? void 0 : _a.posts.push(value);
        }
        else {
            users.push({
                userId: value.userId,
                posts: [value]
            });
        }
    });
    render(users);
    addListeners(users);
}
function render(users) {
    for (var _i = 0, users_1 = users; _i < users_1.length; _i++) {
        var userPosts = users_1[_i];
        postsList === null || postsList === void 0 ? void 0 : postsList.insertAdjacentHTML('beforeend', "\n      <li class=\"posts__post-user-".concat(userPosts.userId, " user-item\"><b>User #").concat(userPosts.userId, "</b></li>\n    "));
        for (var _a = 0, _b = userPosts.posts; _a < _b.length; _a++) {
            var post = _b[_a];
            var postUser = document.querySelector(".posts__post-user-".concat(userPosts.userId));
            postUser === null || postUser === void 0 ? void 0 : postUser.insertAdjacentHTML('beforeend', "\n      <ul class=\"post__content\">\n      <li class=\"post__title-".concat(post.id, "\">Title: ").concat(post.title, "</li>\n      <li class=\"post__body-").concat(post.id, "\">").concat(post.body, "</li>\n    </ul>\n    <form class=\"posts__update-post\" name=\"addPost-").concat(post.id, "\" >\n      <input type=\"text\" name=\"input\" placeholder=\"Enter update\" class=\"posts__enter-value\"/>\n      <button type=\"button\" name=\"add-title-").concat(post.id, "\" class=\"button__update\">Update title</button>\n      <button type=\"button\" name=\"add-body-").concat(post.id, "\" class=\"button__update\">Update post</button>\n    </form>\n      "));
        }
    }
}
function addListeners(users) {
    buttonUpdate = document.querySelectorAll('.button__update');
    buttonUpdate.forEach(function (button) {
        button.addEventListener('click', function (event) {
            var _a;
            var _b;
            var id = +(event === null || event === void 0 ? void 0 : event.target).name.replace(/[^0-9]/g, '');
            var form = document.forms.namedItem("addPost-".concat(id));
            var formValue = (_b = document.forms
                .namedItem("addPost-".concat(id))) === null || _b === void 0 ? void 0 : _b.elements.namedItem('input');
            var input = formValue.value;
            var buttonTitle = (event === null || event === void 0 ? void 0 : event.target).name.split('-')[1];
            if (!input) {
                window.alert('Please, enter your updates');
            }
            else {
                updateObjectInArray(users, id, buttonTitle, (_a = {},
                    _a[buttonTitle] = input,
                    _a));
                form === null || form === void 0 ? void 0 : form.reset();
            }
        });
    });
}
function updateObjectInArray(data, key, value, patch) {
    var itemToUpdate = document.querySelector(".post__".concat(value, "-").concat(key));
    data.map(function (item) {
        return item.posts.map(function (post) {
            if (post.id === key) {
                post[value] = patch[value];
            }
        });
    });
    itemToUpdate.textContent =
        value === 'title'
            ? (itemToUpdate.textContent = "Title: ".concat(patch[value]))
            : (itemToUpdate.textContent = patch[value]);
}
getPosts(initialRender);
