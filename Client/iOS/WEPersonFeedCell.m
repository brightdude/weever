//
//  WEPersonFeedCell.m
//  weever
//
//  Created by Ilia Ridge on 4/15/14.
//  Copyright (c) 2014 Luwei. All rights reserved.
//

#import "WEPersonFeedCell.h"
#import "UIAlertView+Additions.h"
#import "AppDelegate.h"
#import "WECustomActivity.h"
#import "WEActivityFactory.h"
#import <DBChooser/DBChooser.h>


@implementation WEPersonFeedCell

-(void)setIsPeer:(BOOL)isPeer {
    _isPeer = isPeer;
    
//    [self.friendImageView3 setUserInteractionEnabled:_isPeer];
//    [self.friendImageView3 setEnabled:_isPeer];
    
}
-(void)setUser:(WEUser *)user isPeer:(BOOL)isPeer {

    _user = user;
    _isPeer = isPeer;
    
    // Initialization code
    UIColor* mainColor = [UIColor colorWithRed:222.0/255 green:59.0/255 blue:47.0/255 alpha:1.0f];
    
    NSString* fontName = @"GillSans-Italic";
    NSString* boldFontName = @"GillSans-Bold";
    
    self.nameLabel.textColor =  [UIColor pmMainColor];
    self.nameLabel.font =  [UIFont fontWithName:boldFontName size:18.0f];
    self.nameLabel.text =  [NSString stringWithFormat:@"%@ %@" , _user.firstName , _user.lastName] ;
    
    self.locationLabel.textColor =  [UIColor pmMainColor];
    self.locationLabel.font =  [UIFont fontWithName:fontName size:14.0f];
    self.locationLabel.text = _user.title;
    
    UIFont* countLabelFont = [UIFont fontWithName:boldFontName size:20.0f];
    self.followerCountLabel.textColor =  mainColor;
    self.followerCountLabel.font =  countLabelFont;
    self.followerCountLabel.text = @"132k";
    
    self.followingCountLabel.textColor =  mainColor;
    self.followingCountLabel.font =  countLabelFont;
    self.followingCountLabel.text = @"200";
    
    self.updateCountLabel.textColor =  mainColor;
    self.updateCountLabel.font =  countLabelFont;
    self.updateCountLabel.text = @"20k";
    
    
    UIFont* socialFont = [UIFont fontWithName:boldFontName size:7.0f];
    UIColor* socialColor = [UIColor lightGrayColor];
    
    self.followerLabel.textColor =  socialColor;
    self.followerLabel.font =  socialFont;
    self.followerLabel.text = @"FOLLOWERS";
    
    self.followingLabel.textColor =  socialColor;
    self.followingLabel.font =  socialFont;
    self.followingLabel.text = @"FOLLOWING";
    
    self.updateLabel.textColor =  socialColor;
    self.updateLabel.font =  socialFont;
    self.updateLabel.text = @"UPDATES";
    
    
    UIFont* labelFont = [UIFont fontWithName:boldFontName size:12.0f];
    
    
    self.bioLabel.textColor =  mainColor;
    self.bioLabel.font =  labelFont;
    self.bioLabel.text = @"Bio";
    
    self.friendLabel.textColor =  mainColor;
    self.friendLabel.font =  labelFont;
    self.friendLabel.text = @"Friends";
    
    UIFont* valueFont = [UIFont fontWithName:fontName size:12.0f];
    
    self.joinedValueLabel.textColor =  mainColor;
    self.joinedValueLabel.font =  valueFont;
    self.joinedValueLabel.text = _user.formattedActiveDate;
    
    self.joinedLabel.textColor =  [UIColor pmNeutralLightColor];
    self.joinedLabel.font =  labelFont;
    self.joinedLabel.text = @"Joined";
    
    
    self.bioValueLabel.textColor =  [UIColor pmNeutralColor];
    self.bioValueLabel.font =  valueFont;
    self.bioValueLabel.text = _user.bio;
    
    
    self.profileBgImageView.image = [UIImage imageNamed:@"wine-cork.jpg"];
    self.profileBgImageView.contentMode = UIViewContentModeScaleAspectFill;
    
    self.profileImageView.image = _user.avatarImage;
    self.profileImageView.contentMode = UIViewContentModeScaleAspectFill;
    self.profileImageView.clipsToBounds = YES;
    self.profileImageView.layer.cornerRadius = 48.0f;
    self.profileImageView.layer.borderWidth = 4.0f;
    
    if (self.isPeer)
        self.profileImageView.layer.borderColor = [UIColor greenColor].CGColor;
    else
        self.profileImageView.layer.borderColor = [UIColor whiteColor].CGColor;
    
    self.overlayView.backgroundColor = [UIColor colorWithWhite:0.0f alpha:0.5f];
    
    self.countContainer.backgroundColor = [UIColor colorWithWhite:0.95 alpha:1.0f];
    
    self.joinedContainer.layer.borderColor = [UIColor colorWithWhite:0.9 alpha:0.7].CGColor;
    self.joinedContainer.layer.borderWidth = 1.0f;
    
    self.bioContainer.layer.borderColor = [UIColor colorWithWhite:0.9 alpha:0.7].CGColor;
    self.bioContainer.layer.borderWidth = 1.0f;
    
    self.friendContainer.layer.borderColor = [UIColor colorWithWhite:0.9 alpha:0.7].CGColor;
    self.friendContainer.layer.borderWidth = 1.0f;
    
    //[self styleFriendProfileImage:self.friendImageView1.imageView withImageNamed:@"profile-1.jpg" andColor:imageBorderColor];
    
    UIImage* img = [UIImage imageNamed:@"speech_bubble_filled-512" tintColor:[UIColor pmOnColor] style:UIImageTintedStyleKeepingAlpha];
    
    [self.friendImageView1 setAction:@"TouchInside" withBlock:^{
        [[self delegate] startChat:self.user];
    }];
    
    [self.friendImageView1 setImage:img forState:UIControlStateNormal];
    self.friendImageView1.imageView.contentMode = UIViewContentModeScaleAspectFill;
    self.friendImageView1.imageView.clipsToBounds = YES;
    
    UIImage* img3;
    
    if(self.isPeer) {
        img3 = [UIImage imageNamed:@"upload-512" tintColor:[UIColor pmOnColor] style:UIImageTintedStyleKeepingAlpha];
        [self.friendImageView3 setAction:@"TouchInside" withBlock:^{
        }];
    }
    else {
        img3 = [UIImage imageNamed:@"hand-512" tintColor:[UIColor pmOnColor] style:UIImageTintedStyleKeepingAlpha];
        [self.friendImageView3 setAction:@"TouchInside" withBlock:^{
        }];
    }
    
    [self.friendImageView3 setImage:img3 forState:UIControlStateNormal];
    self.friendImageView3.imageView.contentMode = UIViewContentModeScaleAspectFill;
    self.friendImageView3.imageView.clipsToBounds = YES;
    
    [self.friendImageView3 setAction:@"TouchInside" withBlock:^{

        if (!self.isPeer)
            return;

        WEUser* user = [(AppDelegate*)[[UIApplication sharedApplication] delegate] currentUser];
        NSString* userName = [NSString stringWithFormat:@"%@ %@" , user.firstName , user.lastName];

        WECustomActivity* dropBoxActivity  = [WEActivityFactory dropBoxActivity :^(id result) {
                                                                                                        /* AFTER DROPBOX RETURNS A VALUE */
                                                                                                        dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
                                                                                                            
                                                                                                            NSString* file = (NSString*)result;
                                                                                                            NSString* fileName = [file lastPathComponent];
                                                                                                            
                                                                                                            NSDictionary* context =  [NSDictionary dictionaryWithObjectsAndKeys:userName, @"user",
                                                                                                                                      [fileName stringByReplacingPercentEscapesUsingEncoding:NSUTF8StringEncoding] , @"file", nil];

                                                                                                            NSData* data = [NSData dataWithContentsOfURL:[NSURL URLWithString:file]];

                                                                                                            dispatch_async(dispatch_get_main_queue(), ^{
                                                                                                                    [[self delegate] startDataSend:self.user withData:data withContext:context];

                                                                                                            });
                                                                                                        });


                                                                                        
                                                                                                }];
        
        WECustomActivity* imagePicker  = [WEActivityFactory imagePickerActivity:^(id result) {
            /* AFTER ImagePicker RETURNS A VALUE */
            
            NSLog (@"Image Picker result %@" , result);
            
            UIImage* image = [result objectForKey:@"UIImagePickerControllerOriginalImage"];
            NSData* data = UIImageJPEGRepresentation(image , 0.5);
            
            dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
                
//                NSString* file = (NSString*)result;
                  NSString* fileName = @"SentImage.jpg";
//                
                NSDictionary* context =  [NSDictionary dictionaryWithObjectsAndKeys:userName, @"user",
                                          [fileName stringByReplacingPercentEscapesUsingEncoding:NSUTF8StringEncoding] , @"file", nil];
                
                dispatch_async(dispatch_get_main_queue(), ^{
                   [[self delegate] startDataSend:self.user withData:data withContext:context];
                });
            });
            
        }];
        
        WECustomActivity* voiceRecorder  = [WEActivityFactory voiceRecorderActivity:^(id result) {
            /* AFTER DROPBOX RETURNS A VALUE */
            dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
                
//                NSString* file = (NSString*)result;
//                NSString* fileName = [file lastPathComponent];
//                
//                NSDictionary* context =  [NSDictionary dictionaryWithObjectsAndKeys:userName, @"user",
//                                          [fileName stringByReplacingPercentEscapesUsingEncoding:NSUTF8StringEncoding] , @"file", nil];
//                
//                NSData* data = [NSData dataWithContentsOfURL:[NSURL URLWithString:file]];
                
                dispatch_async(dispatch_get_main_queue(), ^{
//                    [[self delegate] startDataSend:self.user withData:data withContext:context];
                    
                });
            });
            
            
            
        }];

        WECustomActivity* photoCamera  = [WEActivityFactory photoCameraActivity:^(id result) {
            
            NSLog (@"Photo Camera result %@" , result);
            
            return;
            
            UIImage* image = [result objectForKey:@"UIImagePickerControllerOriginalImage"];
            NSData* data = UIImageJPEGRepresentation(image , 0.5);
            
            dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
                
                NSString* fileName = @"Image.jpg";

                NSDictionary* context =  [NSDictionary dictionaryWithObjectsAndKeys:userName, @"user",
                                          [fileName stringByReplacingPercentEscapesUsingEncoding:NSUTF8StringEncoding] , @"file", nil];
                
                dispatch_async(dispatch_get_main_queue(), ^{
                    [[self delegate] startDataSend:self.user withData:data withContext:context];
                });
            });
            
        }];
        
        UIActivityViewController *controller = [WEActivityFactory activityController:
                                                [NSArray arrayWithObjects: dropBoxActivity,
                                                                           imagePicker,
                                                                           voiceRecorder,
                                                                           photoCamera,
                                                                           nil] ];
        
        [self.delegate presentViewController:controller animated:YES completion:nil];
        
    }];
    
    UIImage* img2 = [UIImage imageNamed:@"closed_topic-512" tintColor:[UIColor pmOnColor] style:UIImageTintedStyleKeepingAlpha];
    
    [self.friendImageView2 setAction:@"TouchInside" withBlock:^{
        [[self delegate] startProvateChannel:self.user];
    }];


    [self.friendImageView2 setImage:img2 forState:UIControlStateNormal];
    self.friendImageView2.imageView.contentMode = UIViewContentModeScaleAspectFill;
    self.friendImageView2.imageView.clipsToBounds = YES;
    
    
    
    self.contentView.layer.cornerRadius = 10.0f;
    self.contentView.layer.borderWidth = 1.0f;
    self.contentView.layer.borderColor = [UIColor pmNeutralColor].CGColor;

    
}


- (void)setSelected:(BOOL)selected animated:(BOOL)animated
{
    [super setSelected:selected animated:animated];

    // Configure the view for the selected state
}

@end
