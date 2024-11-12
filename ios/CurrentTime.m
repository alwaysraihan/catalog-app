#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(CurrentTimeModule, RCTEventEmitter)
RCT_EXTERN_METHOD(startTimeUpdate)
RCT_EXTERN_METHOD(stopTimeUpdate)
@end
