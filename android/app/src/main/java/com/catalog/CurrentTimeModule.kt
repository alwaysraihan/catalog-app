package com.catalog

import android.os.Handler
import android.os.Looper
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.modules.core.DeviceEventManagerModule
import java.util.*

class CurrentTimeModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private var timer: Timer? = null
    private val handler = Handler(Looper.getMainLooper())
    private var hasListeners = false

    override fun getName(): String {
        return "CurrentTimeModule"
    }

    override fun initialize() {
        super.initialize()
    }

    override fun onCatalystInstanceDestroy() {
        stopTimeUpdate()
        super.onCatalystInstanceDestroy()
    }

    // Start observing when listeners are added
    override fun initialize() {
        hasListeners = true
    }

    // Stop observing when no listeners are present
    override fun stopObserving() {
        hasListeners = false
        stopTimeUpdate()
    }

    // Emit the supported event names to React Native
    @ReactMethod
    override fun supportedEvents(): List<String> {
        return listOf("onTimeUpdate")
    }

    @ReactMethod
    fun startTimeUpdate() {
        if (timer == null) {
            timer = Timer()
            timer?.scheduleAtFixedRate(object : TimerTask() {
                override fun run() {
                    if (hasListeners) {
                        val timestamp = System.currentTimeMillis()
                        handler.post {
                            sendEvent("onTimeUpdate", timestamp)
                        }
                    }
                }
            }, 0, 20000) // 20 seconds interval
        }
    }

    @ReactMethod
    fun stopTimeUpdate() {
        timer?.cancel()
        timer = null
    }

    private fun sendEvent(eventName: String, timestamp: Long) {
        reactApplicationContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit(eventName, mapOf("timestamp" to timestamp))
    }
}
