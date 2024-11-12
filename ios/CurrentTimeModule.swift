import Foundation
import React

@objc(CurrentTimeModule)
class CurrentTimeModule: RCTEventEmitter {
    private var timer: Timer?
    private var hasListeners = false
    

    override init() {
        super.init()
    }
    
    override static func requiresMainQueueSetup() -> Bool {
        return false
    }
    
    override func supportedEvents() -> [String]! {
        return ["onTimeUpdate"]
    }
    
    override func startObserving() {
        hasListeners = true
    }
    
    override func stopObserving() {
        hasListeners = false
        stopTimeUpdate()
    }
    
    @objc func startTimeUpdate() {
        DispatchQueue.main.async { [weak self] in
            self?.timer = Timer.scheduledTimer(withTimeInterval: 20.0, repeats: true) { _ in
                if self?.hasListeners ?? false {
                    let timestamp = Int64(Date().timeIntervalSince1970 * 1000)
                    self?.sendEvent(withName: "onTimeUpdate", body: ["timestamp": timestamp])
                }
            }
        
            self?.sendEvent(withName: "onTimeUpdate",
                          body: ["timestamp": Int64(Date().timeIntervalSince1970 * 1000)])
        }
    }
    
    @objc func stopTimeUpdate() {
        timer?.invalidate()
        timer = nil
    }
}
