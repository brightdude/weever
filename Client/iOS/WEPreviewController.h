//
//  WEPreviewController.h
//  weever
//
//  Created by Ilia Ridge on 4/18/14.
//  Copyright (c) 2014 Luwei. All rights reserved.
//

#import <QuickLook/QuickLook.h>

@interface WEPreviewController : QLPreviewController <QLPreviewControllerDataSource,QLPreviewControllerDelegate>

@property (nonatomic , strong) NSURL* previewUrl;
@property (nonatomic , strong)  UIViewController* vc;

- (id)initWithFileName:(NSString *)url;
- (id)initWithUrl:(NSURL*)url;
- (id)initWithData:(NSData*)data withFile:(NSString*)file;

-(void) showPreview;
+(UIViewController*) previewController;

@end
