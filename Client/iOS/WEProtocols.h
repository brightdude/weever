//
//  WEProtocols.h
//  weever
//
//  Created by Ilia Ridge on 4/18/14.
//  Copyright (c) 2014 Luwei. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "PMConstants.h"

typedef void (^ReturnBlock)(id); //void(^MyCustomBlock)(void)
typedef void (^performBlock)(id); //void(^MyCustomBlock)(void)


@protocol AsyncImageDownloadDelegate <NSObject>

@required

-(void) downloadDidComplete:(id)sender;

@end

@protocol PersonCommunicationProtocol <NSObject>

@required

-(void)startDataSend:(id)toUser withData:(NSData*)data withContext:(NSDictionary*)dataContext;
-(void)startChat:(id)toUser;
-(void)startProvateChannel:(id)toUser;

@end

@protocol ContentCreateDelegate <NSObject>

@required

-(void)onFinishedCreatingContent:(NSDictionary*)data;

@end

@protocol OptionsPickerDelegate <NSObject>

@required

-(void)onFinishedPickingOptions:(NSDictionary*)data;

@end

@protocol FileDownloadProgressDelegate <NSObject>

@required

-(void)downloadPercentComplete:(double)progress;
-(void)didFinishDownload:(NSURL*)file;

@end

@protocol ProcessDataDelegate <NSObject>
@required
- (void) passData: (id)data;
@end

@protocol AVRecorderDelegate <NSObject>
- (void) voiceRecordingController:(id)recorder didFinishRecording:(NSString *)filePath ;
@end

