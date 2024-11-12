package com.catalog

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.WritableMap
import com.facebook.react.modules.core.DeviceEventManagerModule
import java.util.Timer
import java.util.TimerTask

class CurrentTimeModule(reactContext: ReactApplicationContext) :
        ReactContextBaseJavaModule(reactContext) {
    private var timer: Timer? = null
    private var hasListeners = false

    override fun getName(): String {
        return "CurrentTimeModule"
    }

    private fun sendEvent(eventName: String, params: WritableMap?) {
        reactApplicationContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit(eventName, params)
    }

    @ReactMethod
    fun addListener(eventName: String) {
        hasListeners = true
    }

    @ReactMethod
    fun removeListeners(count: Int) {
        hasListeners = false
        stopTimeUpdate()
    }

    @ReactMethod
    fun startTimeUpdate() {
        timer?.cancel()

        timer =
                Timer().apply {
                    // Send initial update
                    sendTimeUpdate()

                    // Schedule periodic updates
                    scheduleAtFixedRate(
                            object : TimerTask() {
                                override fun run() {
                                    if (hasListeners) {
                                        sendTimeUpdate()
                                    }
                                }
                            },
                            20000,
                            20000
                    ) // 20 seconds interval
                }
    }

    @ReactMethod
    fun stopTimeUpdate() {
        timer?.cancel()
        timer = null
    }

    private fun sendTimeUpdate() {
        val params =
                Arguments.createMap().apply {
                    putDouble("timestamp", System.currentTimeMillis().toDouble())
                }
        sendEvent("onTimeUpdate", params)
    }
}
