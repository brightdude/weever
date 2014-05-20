//
//  PMChannelViewController.h
//  ProxiMore
//
//  Created by Ilia Ridge on 3/15/14.
//  Copyright (c) 2014 Luwei. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "InfiniteScrollPicker.h"
#import "UIView+viewController.h"
#import "JSMessageInputView.h"
#import "JSMessage.h"
#import "WEuser.h"
#import "WEUserCache.h"
#import "PMTextEditController.h"
#import "PMImageCache.h"
#import "QuickLook/QuickLook.h"
#import "WEPreviewController.h"


@interface PMChannelViewController : UIViewController <UITableViewDataSource , UITableViewDelegate,
                                     UITextViewDelegate , AsyncImageDownloadDelegate, InfiniteScrollerPickerDelegate,
                                     QLPreviewControllerDataSource,QLPreviewControllerDelegate, ContentCreateDelegate>

@property (nonatomic, strong) PMImageCache *pmCache;
@property (strong, nonatomic) UITableView* table;
@property (strong, nonatomic) id delegate;
@property (strong, nonatomic) NSDictionary* channel;
@property (strong, nonatomic) UITableViewCell* profileAvatars;
@property (strong, nonatomic) JSMessageInputView* messageInputView;
@property (strong, nonatomic) NSMutableArray* subscribers;
@property (strong, nonatomic) NSURL* previewUrl;
@property (strong, nonatomic) WEPreviewController* previewController;

@property (nonatomic) int avatarImageCounter;
@property (nonatomic) BOOL isAllAvatars;


@end
