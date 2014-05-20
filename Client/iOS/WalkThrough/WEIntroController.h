//
//  GHViewController.h
//  GHWalkThrough
//
//  Created by Tapasya on 21/01/14.
//  Copyright (c) 2014 Tapasya. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "WEIntroView.h"

@interface WEIntroController : UIViewController <WEIntroDelegate>

@property (nonatomic,strong) id<WEIntroDelegate> delegate;

- (WEIntroController*)initWithCompletionHandler:(void(^)(id result))handler;

@property (nonatomic, copy) void(^completionHandler)(id);


@end
