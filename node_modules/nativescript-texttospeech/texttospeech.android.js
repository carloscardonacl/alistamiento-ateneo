"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var appModule = require("tns-core-modules/application");
var Locale = java.util.Locale;
var TNSTextToSpeech = (function () {
    function TNSTextToSpeech() {
        var _this = this;
        this._initialized = false;
        this._lastOptions = null; // saves a reference to the last passed SpeakOptions for pause/resume/callback methods.
        this._utteranceProgressListener = android.speech.tts.UtteranceProgressListener.extend({
            init: function () {
                // console.log("UtteranceProgressListener created!");
            },
            onStart: function (utteranceId) {
                // TODO
            },
            onError: function (utteranceId) {
                // TODO
            },
            onDone: function (utteranceId) {
                if (_this._lastOptions && _this._lastOptions.finishedCallback) {
                    _this._lastOptions.finishedCallback();
                }
            }
        });
    }
    TNSTextToSpeech.prototype.init = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!_this._tts || !_this._initialized) {
                _this._tts = new android.speech.tts.TextToSpeech(_this._getContext(), new android.speech.tts.TextToSpeech.OnInitListener({
                    onInit: function (status) {
                        // if the TextToSpeech was successful initializing
                        if (status === android.speech.tts.TextToSpeech.SUCCESS) {
                            _this._initialized = true;
                            _this._tts.setOnUtteranceProgressListener(new _this._utteranceProgressListener());
                            resolve();
                        }
                        else {
                            reject(status);
                        }
                    }
                }));
            }
            else {
                resolve();
            }
        });
    };
    TNSTextToSpeech.prototype.speak = function (options) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!_this.isString(options.text)) {
                reject("Text property is required to speak.");
                return;
            }
            _this.init().then(function () {
                var maxLen = 4000; // API level 18 added method for getting value dynamically
                if (android.os.Build.VERSION.SDK_INT >= 18) {
                    try {
                        maxLen = _this._tts.getMaxSpeechInputLength();
                    }
                    catch (error) {
                        //console.log(error);
                    }
                }
                if (options.text.length > maxLen) {
                    reject("Text cannot be greater than " + maxLen.toString() + " characters");
                    return;
                }
                // save a reference to the options passed in for pause/resume methods to use
                _this._lastOptions = options;
                _this.speakText(options);
                resolve();
            }, function (err) {
                reject(err);
            });
        });
    };
    /**
         * Interrupts the current utterance and discards other utterances in the queue.
         * https://developer.android.com/reference/android/speech/tts/TextToSpeech.html#stop()
         */
    TNSTextToSpeech.prototype.pause = function () {
        if (this._tts && this._initialized) {
            this._tts.stop();
        }
    };
    TNSTextToSpeech.prototype.resume = function () {
        //In Android there's no pause so we resume playng the last phrase...
        if (this._lastOptions) {
            this.speak(this._lastOptions);
        }
    };
    /**
           * Releases the resources used by the TextToSpeech engine.
           * https://developer.android.com/reference/android/speech/tts/TextToSpeech.html#shutdown()
           */
    TNSTextToSpeech.prototype.destroy = function () {
        if (this._tts) {
            this._tts.shutdown();
        }
    };
    TNSTextToSpeech.prototype.speakText = function (options) {
        if (this.isString(options.locale) && this.isValidLocale(options.locale)) {
            var localeArray = options.locale.split("-");
            var locale = new Locale(localeArray[0], localeArray[1]);
            this._tts.setLanguage(locale);
        }
        else if (this.isString(options.language)) {
            var locale = null;
            if (this.isValidLocale(options.language)) {
                // only for backwards compatbility with old API
                var languageArray = options.language.split("-");
                locale = new Locale(languageArray[0], languageArray[1]);
            }
            else {
                locale = new Locale(options.language);
            }
            if (locale) {
                this._tts.setLanguage(locale);
            }
        }
        if (!this.isBoolean(options.queue)) {
            options.queue = false;
        }
        if (!options.queue && this._tts.isSpeaking()) {
            this._tts.stop();
        }
        // no range of valid values for Android so just cover default value if none provided
        if (!this.isNumber(options.pitch)) {
            options.pitch = 1.0;
        }
        // no range of valid values for Android so just cover default value if none provided
        if (!this.isNumber(options.speakRate)) {
            options.speakRate = 1.0;
        }
        // valid values are 0.0 to 1.0
        if (!this.isNumber(options.volume) || options.volume > 1.0) {
            options.volume = 1.0;
        }
        else if (options.volume < 0.0) {
            options.volume = 0.0;
        }
        this._tts.setPitch(options.pitch);
        this._tts.setSpeechRate(options.speakRate);
        var queueMode = options.queue
            ? android.speech.tts.TextToSpeech.QUEUE_ADD
            : android.speech.tts.TextToSpeech.QUEUE_FLUSH;
        if (android.os.Build.VERSION.SDK_INT >= 21) {
            // Hardcoded this value since the static field LOLLIPOP doesn't exist in Android 4.4
            /// >= Android API 21 - https://developer.android.com/reference/android/speech/tts/TextToSpeech.html#speak(java.lang.CharSequence, int, android.os.Bundle, java.lang.String)
            var params = new android.os.Bundle();
            params.putString("volume", options.volume.toString());
            this._tts.speak(options.text, queueMode, params, "UniqueID");
        }
        else {
            /// < Android API 21 - https://developer.android.com/reference/android/speech/tts/TextToSpeech.html#speak(java.lang.String, int, java.util.HashMap<java.lang.String, java.lang.String>)
            var hashMap = new java.util.HashMap();
            hashMap.put("volume", options.volume.toString());
            this._tts.speak(options.text, queueMode, hashMap);
        }
    };
    TNSTextToSpeech.prototype.getAvailableLanguages = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var result = new Array();
            _this.init().then(function () {
                var languages = _this._tts.getAvailableLanguages().toArray();
                for (var c = 0; c < languages.length; c++) {
                    var lang = {
                        language: languages[c].getLanguage(),
                        languageDisplay: languages[c].getDisplayLanguage(),
                        country: languages[c].getCountry(),
                        countryDisplay: languages[c].getDisplayCountry()
                    };
                    result.push(lang);
                }
                resolve(result);
            }, function (err) {
                reject(err);
            });
        });
    };
    // helper function to get current app context
    TNSTextToSpeech.prototype._getContext = function () {
        if (appModule.android.context) {
            return appModule.android.context;
        }
        var ctx = java.lang.Class
            .forName("android.app.AppGlobals")
            .getMethod("getInitialApplication", null)
            .invoke(null, null);
        if (ctx)
            return ctx;
        ctx = java.lang.Class
            .forName("android.app.ActivityThread")
            .getMethod("currentApplication", null)
            .invoke(null, null);
        return ctx;
    };
    // helper function to test whether language code has valid syntax
    TNSTextToSpeech.prototype.isValidLocale = function (locale) {
        var re = new RegExp("\\w\\w-\\w\\w");
        return re.test(locale);
    };
    TNSTextToSpeech.prototype.isString = function (elem) {
        return Object.prototype.toString.call(elem).slice(8, -1) === "String";
    };
    TNSTextToSpeech.prototype.isBoolean = function (elem) {
        return Object.prototype.toString.call(elem).slice(8, -1) === "Boolean";
    };
    TNSTextToSpeech.prototype.isNumber = function (elem) {
        return Object.prototype.toString.call(elem).slice(8, -1) === "Number";
    };
    return TNSTextToSpeech;
}());
exports.TNSTextToSpeech = TNSTextToSpeech;
