//
//  PMPostCell.h
//  ProxiMore
//
//  Created by Ilia Ridge on 3/15/14.
//  Copyright (c) 2014 Luwei. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "UIImage+Additions.h"
#import "AppDelegate.h"
#import <AVFoundation/AVFoundation.h>
#import "CERoundProgressView.h"
#import "CEPlayer.h"
#import "PMImageCache.h"
#import "WEProtocols.h"

//completionBlock;

@interface PMPostCell : UITableViewCell<AVAudioPlayerDelegate , CEPlayerDelegate , FileDownloadProgressDelegate>

//@property (strong,nonatomic) id <ProcessDataDelegate> delegate;
@property (strong,nonatomic) NSDictionary* message;
@property (strong,nonatomic) AVAudioPlayer *audioPlayer;

@property (strong,nonatomic) UILabel* title;
@property (strong,nonatomic) UILabel* count;
@property (strong,nonatomic) UILabel* content;
@property (strong,nonatomic) UIImageView* bg;
@property (strong,nonatomic) UIButton* btn;

@property (strong,nonatomic) UILabel* members;
@property (strong,nonatomic) UILabel* posts;
@property (strong,nonatomic) UIImageView* kind;
@property (nonatomic) BOOL isPlaying;

@property (nonatomic, weak) NSOperationQueue *localOperationQueue;
@property (nonatomic, weak) NSCache *localCache;
@property (strong, nonatomic) IBOutlet CERoundProgressView *progressView;
@property (strong, nonatomic) IBOutlet CEPlayer *cePlayer;

-(void) startFileDownloadWithcompletionBlock:(void (^)(id))completionBlock;
@property (strong,nonatomic) ReturnBlock completionBlock;

@end
