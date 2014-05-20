//
//  PMChannelHeaderView.m
//  ProxiMore
//
//  Created by Ilia Ridge on 3/17/14.
//  Copyright (c) 2014 Luwei. All rights reserved.
//

#import "PMChannelHeaderView.h"
#import "UIColor+UIColor_Additions.h"
#import "PMConstants.h"
#import "AppDelegate.h"

@implementation PMChannelHeaderView

- (id)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    if (self) {
        // Initialization code
    }
    
    //NSLog (@"InChannel %@" , self.channel);
    
    return self;
}


-(UIImage*) asImage {
    
        UIGraphicsBeginImageContextWithOptions(self.bounds.size, self.opaque, 0.0);
        [self.layer renderInContext:UIGraphicsGetCurrentContext()];
        
        UIImage * img = UIGraphicsGetImageFromCurrentImageContext();
        
        UIGraphicsEndImageContext();
        
        return img;

}

-(void) setUpView:(id)channel andCompletionBlock:(void (^)(id))setupResult {
    
    
    //[cell.bg setImage:[UIImage imageNamed:@"Profile_image.png"]];
    //[cell setRandomGBColor];
    
    AppDelegate* d = (AppDelegate*)[[UIApplication sharedApplication] delegate];

    self.pmCache = [d imageCache];
    
    
    self.channel = channel;
    
    self.bg = [[UIImageView alloc] initWithFrame:self.frame];
    
    NSDictionary* row = self.channel;
    
    if (![((NSString*)[row objectForKey:@"image"]) isEqualToString:@""]) {
        
        NSString *imageUrlString = [[baseUrl stringByAppendingString:@"/upload/"] stringByAppendingString:[row objectForKey:@"image"]];
        
        [self.pmCache getImage:imageUrlString withCompletionBlock:^(id result){
            [self.bg setImage:result];
            
            setupResult(result);
            
        }
         ];

        
//        [self.bg setBackgroundColor:[UIColor colorWithHexString:[row objectForKey:@"color"]]];
//        [self.bg setImage:nil];
        

    }
    else {
        
        [self.bg setBackgroundColor:[UIColor colorWithHexString:[row objectForKey:@"color"]]];
        [self.bg setImage:nil];
        setupResult([self asImage]);
    }
     /* END */
    
//    [self.bg setBackgroundColor:[UIColor colorWithHexString:[self.channel objectForKey:@"color"]]];
//    [self.bg setImage:nil];
    
    
    self.title = [[UILabel alloc] initWithFrame:CGRectMake(55, 2, self.frame.size.width - 20, 60)];
    [self.title setBackgroundColor:[UIColor clearColor]];
    [self.title setNumberOfLines:3];
    [self.title setTextColor:[UIColor whiteColor]];
    [self.title setFont:[UIFont systemFontOfSize:16]];
    [self.title setTextAlignment:NSTextAlignmentLeft];
    
    
    [self.title setText:[self.channel objectForKey:@"message"]];
    
    [self.bg addSubview:self.title];
    
    /*
    self.content = [[UILabel alloc] initWithFrame:CGRectMake(5, 50, self.frame.size.width - 10, self.frame.size.height - 50)];
    [self.content setBackgroundColor:[UIColor clearColor]];
    [self.content setText:[self.channel objectForKey:@"message"]];
    [self.content setNumberOfLines:10];
    [self.content setTextColor:[UIColor whiteColor]];
    [self.content setFont:[UIFont fontWithName:@"Helvetica-Bold" size:16]];
    [self.content setTextAlignment:NSTextAlignmentCenter]; */
    
//    self.kind = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"tv_show-512" tintColor:[UIColor whiteColor] style:UIImageTintedStyleKeepingAlpha]];
//    self.kind.frame = CGRectMake(10, 15, 32, 32);
    
    UIImageView* imembers = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"group-512" tintColor:[UIColor whiteColor] style:UIImageTintedStyleKeepingAlpha]];
    imembers.frame = CGRectMake(250, 282, 25, 25);
    
    self.members = [[UILabel alloc] initWithFrame:CGRectMake(280, 280, 40, 40)];
    [self.members setBackgroundColor:[UIColor clearColor]];
    [self.members setTextColor:[UIColor whiteColor]];
    [self.members setFont:[UIFont systemFontOfSize:16]];
    [self.members setTextAlignment:NSTextAlignmentLeft];
    
    NSArray* subscribers = [self.channel objectForKey:@"subscribers"];
    [self.members setText:[NSString stringWithFormat:@"%i" , [subscribers count]]];
    //NSLog (@"seunscripers count %@ - %@" ,self.channel ,[NSString stringWithFormat:@"%i" , [subscribers count]]);

    
    
    UIImageView* iposts = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"speech_bubble_filled-512" tintColor:[UIColor whiteColor] style:UIImageTintedStyleKeepingAlpha]];
    iposts.frame = CGRectMake(190, 282, 25, 25);
    
    self.posts = [[UILabel alloc] initWithFrame:CGRectMake(220, 280, 40, 40)];
    [self.posts setBackgroundColor:[UIColor clearColor]];
    [self.posts setTextColor:[UIColor whiteColor]];
    [self.posts setFont:[UIFont systemFontOfSize:16]];
    [self.posts setTextAlignment:NSTextAlignmentLeft];
    
    NSArray* posts = [self.channel objectForKey:@"posts"];
    [self.posts setText:[NSString stringWithFormat:@"%i" , [posts count]]];
    
    
    
    //[self.bg addSubview:self.content];
    //[self.bg addSubview:self.kind];
    [self.bg addSubview:self.members];
    [self.bg addSubview:imembers];
    [self.bg addSubview:self.posts];
    [self.bg addSubview:iposts];
    
    [UIImage whiteColorImage];
    
    
    [self addSubview:self.bg];
    
    UITapGestureRecognizer *tap = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(handleTap:)];
    [self addGestureRecognizer:tap];

}

@end
