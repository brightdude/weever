//
//  WECustomActivity.m
//  weever
//
//  Created by Ilia Ridge on 4/18/14.
//  Copyright (c) 2014 Luwei. All rights reserved.
//

#import "WECustomActivity.h"
#import "UIImage+Additions.h"

@implementation WECustomActivity

+(WECustomActivity*)withImageName:(NSString*)imageName andTitle:(NSString*)imageTitle andBlock:(performBlock)imageBlock {

    WECustomActivity* ac = [[WECustomActivity alloc] init];
    
    [ac setTitle:imageTitle];
    [ac setImage:[imageName stringByAppendingString:@"-512"]];
    [ac setBlock:imageBlock];
    
    return ac;
}

- (NSString *)activityType
{
    return @"yourappname.Review.App";
}

- (NSString *)activityTitle
{
    return self.title;
}

- (UIImage *)activityImage
{
    // Note: These images need to have a transparent background and I recommend these sizes:
    // iPadShare@2x should be 126 px, iPadShare should be 53 px, iPhoneShare@2x should be 100
    // px, and iPhoneShare should be 50 px. I found these sizes to work for what I was making.
    
    if (UI_USER_INTERFACE_IDIOM() == UIUserInterfaceIdiomPad)
    {
        return [UIImage imageNamed:self.image];
    }
    else
    {
        return [UIImage imageWithImage:[UIImage imageNamed:self.image] scaledToSize:CGSizeMake(32, 32)];
    }
    
}

- (BOOL)canPerformWithActivityItems:(NSArray *)activityItems
{
    NSLog(@"%s", __FUNCTION__);
    return YES;
}

- (void)prepareWithActivityItems:(NSArray *)activityItems
{
    NSLog(@"%s",__FUNCTION__);
}

- (UIViewController *)activityViewController
{
    NSLog(@"%s",__FUNCTION__);
    return nil;
}

- (void)performActivity
{
    // This is where you can do anything you want, and is the whole reason for creating a custom
    // UIActivity
    
    //[[UIApplication sharedApplication] openURL:[NSURL URLWithString:@"itms-apps://ax.itunes.apple.com/WebObjects/MZStore.woa/wa/viewContentsUserReviews?type=Purple+Software&id=yourappid"]];
    self.block(nil);
    
    [self activityDidFinish:YES];
}

@end
