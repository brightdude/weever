//
//  PMPostCell.m
//  ProxiMore
//
//  Created by Ilia Ridge on 3/15/14.
//  Copyright (c) 2014 Luwei. All rights reserved.
//

#import "PMPostCell.h"
#define ARC4RANDOM_MAX      0x100000000


@implementation PMPostCell

@synthesize message;

- (void)awakeFromNib
{
    // Initialization code
    //[self setRandomGBColor];
    
    

}

- (void)setMessage:(NSDictionary *)m {
    
    message = m;
    
    if (!self.bg) {
        self.bg = [[UIImageView alloc] initWithFrame:self.frame];
        [self.bg setUserInteractionEnabled:YES];
        [self addSubview:self.bg];

    }
    
    if (!self.title) {
        self.title = [[UILabel alloc] initWithFrame:CGRectMake(12, 5, self.frame.size.width - 20, 60)];
        [self.title setBackgroundColor:[UIColor clearColor]];
        [self.title setNumberOfLines:3];
        [self.title setBackgroundColor:[UIColor clearColor]];
        
        [self.title setTextColor:[UIColor pmNeutralLightColor]];
        [self.title setFont:[UIFont fontWithName:[UIFont pmTextFont] size:12.0f]];
        

        [self.title setTextAlignment:NSTextAlignmentLeft];
        [self.bg addSubview:self.title];
    }
    
    [self.title setText:[self.message objectForKey:@"content"]];
  
    self.selectionStyle = UITableViewCellSelectionStyleNone;
    
    //NSLog (@"THE CELL %@" , self.message);
    
    //NSLog (@"cell recording %@" , [self.message objectForKey:@"sound"]);
    
    UIImageView* iconView = [[UIImageView alloc] initWithFrame:CGRectMake(10, 20, 32, 32)];
    
    WEUserCache* cache = [(AppDelegate*)[[UIApplication sharedApplication] delegate] userCache];
    
    [cache userForId:[self.message objectForKey:@"ownerId"] withCompletionBlock:^(id result){
        NSLog (@"User does exist");
        WEUser* user = (WEUser*)result;
        [iconView setImage:user.avatarImage];
    }];
    
    [self addSubview:iconView];
    
    //        self.title.frame = CGRectMake(45, 5, self.frame.size.width - 32, 60);
    
    self.title.frame = CGRectMake(45, 5, self.frame.size.width - 32, 60);
    
    
    if ([self.message objectForKey:@"sound"] && ![[self.message objectForKey:@"sound"] isEqualToString:@""]) {
        
        self.title.frame = CGRectMake(45, 5, self.frame.size.width - 75, 60);

        if (!self.btn) {
            
            self.progressView = [[CERoundProgressView alloc] initWithFrame:CGRectMake(self.frame.size.width - 65, 5, 58,58)];
            [self.progressView setTintColor:[UIColor pmColorRed]];
            self.progressView.trackColor = [UIColor colorWithWhite:0.80 alpha:1.0];
            self.progressView.startAngle = (3.0*M_PI)/2.0;
            [self.progressView setUserInteractionEnabled:YES];

            self.btn = [UIButton buttonWithType:UIButtonTypeCustom];
            self.btn.frame = CGRectMake (self.frame.size.width - 67, 4, 62,62);
            [self.btn setBackgroundImage:[UIImage imageNamed:@"Play"]
                       forState:UIControlStateNormal];
            [self.btn setBackgroundImage:[UIImage imageNamed:@"Pause"]
                                forState:UIControlStateSelected];
            
            [self.btn addTarget:self action:@selector(playRecording:) forControlEvents:UIControlEventTouchUpInside];
            [self.bg addSubview:self.progressView];
            [self.bg addSubview:self.btn];
            
        }
        
        
        NSArray *dirPaths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
        NSString *docsDir = [dirPaths objectAtIndex:0];
        NSString *soundFilePath = [docsDir  stringByAppendingPathComponent:[self.message objectForKey:@"sound"]];
        
        BOOL fileExists = [[NSFileManager defaultManager] fileExistsAtPath:soundFilePath];
        
        
        if (!fileExists) {
            
            id d = [[UIApplication sharedApplication] delegate];
            
            self.localOperationQueue = [d imageOperationQueue];
            
            [self.localOperationQueue addOperationWithBlock:^{
                NSString *remoteUrlString = [[NSString alloc]initWithFormat:[baseUrl stringByAppendingString:@"/upload/%@"], [self.message objectForKey:@"sound"]];;
                NSURL *remoteUrl = [ NSURL URLWithString:remoteUrlString];
                
                NSLog(@"DOWNLOAD %@" , remoteUrlString );

                
                NSData *data = [NSData dataWithContentsOfURL:remoteUrl];
                
                if (data != nil) {
                    [data writeToFile:soundFilePath atomically:YES];
                }
            }];
            
        } else {
            NSLog(@"sound EXISTS %@" , soundFilePath );
        }
        
    }
    else
    if ([self.message objectForKey:@"fileUrl"] && ![[self.message objectForKey:@"fileUrl"] isEqualToString:@""]){
        

        
        //[self setAccessoryType:UITableViewCellAccessoryDisclosureIndicator];
        //self.selectionStyle = UITableViewCellSelectionStyleNone;
        
        if (!self.btn) {
            
            self.progressView = [[CERoundProgressView alloc] initWithFrame:CGRectMake(self.frame.size.width - 65, 5, 58,58)];
            [self.progressView setTintColor:[UIColor pmOnColor]];
            self.progressView.trackColor = [UIColor colorWithWhite:0.80 alpha:1.0];
            self.progressView.startAngle = (3.0*M_PI)/2.0;
            [self.progressView setUserInteractionEnabled:YES];
            
            NSString* fileExtension = [[self.message objectForKey:@"fileUrl"] pathExtension];
            
            UILabel* fileType = [[UILabel alloc] initWithFrame:CGRectMake(20, 20, 40, 20)];
            [fileType setText:[fileExtension lowercaseString]];
            [fileType setFont:[UIFont fontWithName:[UIFont pmControlTextFont] size:13.0f]];
            [fileType setTextColor:[UIColor blackColor]];
            
            self.btn = [UIButton buttonWithType:UIButtonTypeCustom];
            self.btn.frame = CGRectMake (self.frame.size.width - 67, 4, 62,62);
            [self.btn setBackgroundImage:[UIImage imageNamed:@"Circle"]
                                forState:UIControlStateNormal];
            [self.btn setBackgroundImage:[UIImage imageNamed:@"Circle"]
                                forState:UIControlStateSelected];
            
            [self.btn addSubview:fileType];
            
            //[self.btn addTarget:self action:@selector(playRecording:) forControlEvents:UIControlEventTouchUpInside];
            [self.bg addSubview:self.progressView];
            [self.bg addSubview:self.btn];
            
        }
        

        

    } else {

            [self.btn setBackgroundImage:nil     forState:UIControlStateNormal];
            [self.btn setBackgroundImage:nil     forState:UIControlStateSelected];

            self.progressView = nil;
            
            //self.title.frame = CGRectMake(10, 5, self.frame.size.width - 20, 60);
        }
    
    
    
    // do some more stuff
}

-(void) startFileDownloadWithcompletionBlock:(void (^)(id))completionBlock {
    
    self.completionBlock = completionBlock;
    
    PMImageCache* cache = [(AppDelegate*)[[UIApplication sharedApplication] delegate] imageCache];
    [cache setDelegate:self];
    [cache getFileWithSession:[self.message objectForKey:@"fileUrl"] withCompletionBlock:^(id file){
        //completionBlock(file);
    }];
    
}


-(void)downloadPercentComplete:(double)progress {
    
    NSLog (@"Progress from cell %f" , progress);
    
    self.progressView.progress = progress;
}

-(void)didFinishDownload:(NSURL*)file {
    NSLog(@"downloaded file is %@" , [file absoluteString]);
    self.completionBlock(file);
}


-(IBAction) stopPlaying
{
    [self.audioPlayer stop];
}


-(void) playRecording:(UIButton*)sender {
    
    
    if (sender.selected) {
        sender.selected = NO;
        self.isPlaying = NO;
        [self stopPlaying];
        [self.cePlayer pause];
        [self.btn setBackgroundImage:[UIImage imageNamed:@"Play"]
                            forState:UIControlStateNormal];
        
    }
    else {
            sender.selected = YES;
            AVAudioSession *audioSession = [AVAudioSession sharedInstance];
            [audioSession setCategory:AVAudioSessionCategoryPlayback error:nil];
            NSArray *dirPaths = NSSearchPathForDirectoriesInDomains(
                                                                    NSDocumentDirectory, NSUserDomainMask, YES);
            NSString *docsDir = [dirPaths objectAtIndex:0];
            NSString *soundFilePath = [docsDir
                                       stringByAppendingPathComponent:[self.message objectForKey:@"sound"]];
            
            NSLog(@"Playing....%@" , soundFilePath);
            
            NSURL *url = [NSURL fileURLWithPath:soundFilePath];
            
            // NSURL *url = [NSURL fileURLWithPath:[NSString stringWithFormat:@"%@/recordTest.caf", [[NSBundle mainBundle] resourcePath]]];
            NSError *error;
            self.audioPlayer = [[AVAudioPlayer alloc] initWithContentsOfURL:url error:&error];
        
            self.cePlayer = [[CEPlayer alloc] init];
            self.cePlayer.delegate = self;
            self.cePlayer.duration = [self.audioPlayer duration];
        
            
            
            self.isPlaying = YES;
            
            if (!self.audioPlayer) {
                NSLog(@"failed playing SeriouslyFunnySound1, error: %@", error);
            }

            self.audioPlayer.delegate = self;
            self.audioPlayer.numberOfLoops = 0;
            [self.audioPlayer play];
            [self.cePlayer play];
    }
    

    
}

- (void) player:(CEPlayer *)player didReachPosition:(float)position
{
    self.progressView.progress = position;
}

- (void) playerDidStop:(CEPlayer *)player
{
    self.btn.selected = NO;
    self.progressView.progress = 0.0;
}


- (void)audioPlayerDidFinishPlaying:(AVAudioPlayer *)player successfully:(BOOL)flag {
    self.isPlaying = NO;
    [self.btn setBackgroundImage:[UIImage imageNamed:@"Play"]
                        forState:UIControlStateNormal];

}

- (void)setSelected:(BOOL)selected animated:(BOOL)animated
{
    [super setSelected:selected animated:animated];

    // Configure the view for the selected state
}

-(void) setRandomGBColor {
    
    double red = ((double)arc4random() / ARC4RANDOM_MAX);
    double green = ((double)arc4random() / ARC4RANDOM_MAX);
    double blue = ((double)arc4random() / ARC4RANDOM_MAX);
    
    self.backgroundColor = [UIColor colorWithRed:red green:green blue:blue alpha:0.7f];
    
}


@end
