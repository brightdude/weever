//
//  ViewController.m
//  TabHoldandRecord
//
//  Created by Ashish Tripathi on 12/08/13.
//  Copyright (c) 2013 Ashish Tripathi. All rights reserved.
//

#import "AViewController.h"

#import <UIKit/UIKit.h>
#import <ImageIO/ImageIO.h>
#import <MobileCoreServices/MobileCoreServices.h>
#import <QuartzCore/QuartzCore.h>

@interface AViewController ()

@end

@implementation AViewController
//static CGFloat const kSeconds = 150.0;

-(id) initWithRect:(CGRect)rect {
    

    
        return self;

}

- (void)viewDidLoad
{
    [super viewDidLoad];
	// Do any additional setup after loading the view, typically from a nib.
    
    //self.view.frame = [[UIApplication sharedApplication] keyWindow].bounds;
    [self.view setBackgroundColor:[UIColor clearColor]];

    
    self.touchbutton = [UIButton buttonWithType:UIButtonTypeCustom];
    self.touchbutton.frame = CGRectMake(self.view.frame.size.width / 2 - 48, self.view.frame.size.height - 244, 106, 106);
    [self.touchbutton setBackgroundImage:[UIImage imageNamed:@"download2-512"] forState:UIControlStateNormal];
    [self.touchbutton addTarget:self action:@selector(doneRecording:) forControlEvents:UIControlEventTouchUpInside];

    //[self.touchbutton setBackgroundColor:[UIColor orangeColor]];
    
    self.customRangeBar = [[F3BarGauge alloc] initWithFrame:CGRectMake(0, 20, self.view.frame.size.width, 64)];
    
    
    UILongPressGestureRecognizer *gesture = [[UILongPressGestureRecognizer alloc]
                                             initWithTarget:self
                                             action:@selector(myButtonLongPressed:)];
    // you can control how many seconds before the gesture is recognized
    gesture.minimumPressDuration = 0.5;
    
    
    
    self.playButton  = [[UIImageView alloc] initWithFrame:CGRectMake(self.view.frame.size.width / 2 - 25 , self.view.frame.size.height / 2 - 100, 80, 80)];
    [self.playButton setImage:[UIImage imageNamed:@"micro-512"]];
    [self.view addGestureRecognizer:gesture];
    
    
    self.statusLabel = [[UILabel alloc] initWithFrame:CGRectMake(self.playButton.frame.origin.x + 36, self.playButton.frame.origin.y + 30 , 40, 38)];
    [self.statusLabel setText:@"0"];
    
    
    self.progressView = [[CERoundProgressView alloc] initWithFrame:CGRectMake(80, 50, 180,180)];
    [self.progressView setTintColor:[UIColor pmOffColor]];
    self.progressView.trackColor = [UIColor pmOnColor];
    self.progressView.startAngle = (3.0*M_PI)/2.0;
    [self.progressView setUserInteractionEnabled:YES];
    
//    UIButton* btn = [UIButton buttonWithType:UIButtonTypeCustom];
//    btn.frame = CGRectMake (120, 120, 90,90);
//    [btn setBackgroundImage:[UIImage imageNamed:@"micro-512"]
//                        forState:UIControlStateNormal];
//    [btn setBackgroundImage:[UIImage imageNamed:@"Pause"]
//                        forState:UIControlStateSelected];
//    
//    [btn addTarget:self action:@selector(myButtonLongPressed:) forControlEvents:UIControlEventTouchDown];
//    [btn addTarget:self action:@selector(myButtonLongPressed:) forControlEvents:UIControlEventTouchUpInside];

    [self.view addSubview:self.progressView];
//    [self.view addSubview:btn];

    
    //self.view.backgroundColor = [UIColor clearColor];
    
    
    
//    [self.view addSubview:self.playButton];
//    [self.view addSubview:self.statusLabel];
    //[self.view addSubview:self.touchbutton];
    //[self.view addSubview:self.customRangeBar];
    [self.view addSubview:self.viewForWave];
    
    NSLog (@"SELF VIEW %@" , self.view);
    
    self.isRecorded = NO;

    
    
}


- (void)addShapeLayer
{
    self.shapeLayer = [CAShapeLayer layer];
    self.shapeLayer.path = [[self pathAtInterval:2.0] CGPath];
    self.shapeLayer.fillColor = [[UIColor redColor] CGColor];
    self.shapeLayer.lineWidth = 1.0;
    self.shapeLayer.strokeColor = [[UIColor whiteColor] CGColor];
    [self.viewForWave.layer addSublayer:self.shapeLayer];
}

- (void)startDisplayLink
{
    self.displayLink = [CADisplayLink displayLinkWithTarget:self selector:@selector(handleDisplayLink:)];
    [self.displayLink addToRunLoop:[NSRunLoop currentRunLoop] forMode:NSDefaultRunLoopMode];
}

- (void)stopDisplayLink
{
    [self.displayLink invalidate];
    self.displayLink = nil;
    
}

- (void)handleDisplayLink:(CADisplayLink *)displayLink
{
    if (!self.firstTimestamp)
        self.firstTimestamp = displayLink.timestamp;
    
    self.loopCount++;
    
    NSTimeInterval elapsed = (displayLink.timestamp - self.firstTimestamp);
    
    self.shapeLayer.path = [[self pathAtInterval:elapsed] CGPath];
    
    //    if (elapsed >= kSeconds)
    //    {
    //       // [self stopDisplayLink];
    //        self.shapeLayer.path = [[self pathAtInterval:0] CGPath];
    //
    //        self.statusLabel.text = [NSString stringWithFormat:@"loopCount = %.1f frames/sec", self.loopCount / kSeconds];
    //    }
}

- (UIBezierPath *)pathAtInterval:(NSTimeInterval) interval
{
    UIBezierPath *path = [UIBezierPath bezierPath];
    
    [path moveToPoint:CGPointMake(0, self.viewForWave.bounds.size.height / 2.0)];
    
    CGFloat fractionOfSecond = interval - floor(interval);
    
    CGFloat yOffset = self.viewForWave.bounds.size.height * sin(fractionOfSecond * M_PI * Pitch*8);
    
    [path addCurveToPoint:CGPointMake(self.viewForWave.bounds.size.width, self.viewForWave.bounds.size.height / 2.0)
            controlPoint1:CGPointMake(self.viewForWave.bounds.size.width / 2.0, self.viewForWave.bounds.size.height / 2.0 - yOffset)
            controlPoint2:CGPointMake(self.viewForWave.bounds.size.width / 2.0, self.viewForWave.bounds.size.height / 2.0 + yOffset)];
    
    return path;
}

- (void) myButtonLongPressed:(UILongPressGestureRecognizer *)gesture
{
    
    
    if (gesture.state == UIGestureRecognizerStateBegan) {

        NSLog(@"BEGAN");
        //self.progress = 0;
        self.timer = [NSTimer scheduledTimerWithTimeInterval:0.1
                                                      target:self
                                                    selector:@selector(onTimeElapsed:)
                                                    userInfo:nil
                                                     repeats:YES];

//        [self.view setBackgroundColor:[UIColor redColor]];
          [self startRecording];
        
    }
    
    if (gesture.state == UIGestureRecognizerStateEnded) {
        
        NSLog(@"ENDED");
        [self.timer invalidate];
        self.timer = nil;
        
        [self stopRecording];
        [self doneRecording:nil];
//        [self.view setBackgroundColor:[UIColor whiteColor]];

    }
    
}

-(void)onTimeElapsed:(NSTimer*)sender {
    
    self.progress += 0.1;
    self.progressView.progress = self.progress / 10;
    
    if (self.progress > 10) {

        [self.timer invalidate];
        self.timer = nil;
        
        [self stopRecording];
        [self playRecording];
        
    }
    
}


-(IBAction) startRecording
{
    self.viewForWave.hidden = NO;
    [self addShapeLayer];
    [self startDisplayLink];
    // kSeconds = 150.0;
    NSLog(@"startRecording");
    audioRecorder = nil;
    AVAudioSession *audioSession = [AVAudioSession sharedInstance];
    [audioSession setCategory:AVAudioSessionCategoryRecord error:nil];
    
    
    NSMutableDictionary *recordSettings = [[NSMutableDictionary alloc] initWithCapacity:10];
    if(recordEncoding == ENC_PCM)
    {
        [recordSettings setObject:[NSNumber numberWithInt: kAudioFormatLinearPCM] forKey: AVFormatIDKey];
        [recordSettings setObject:[NSNumber numberWithFloat:44100.0] forKey: AVSampleRateKey];
        [recordSettings setObject:[NSNumber numberWithInt:2] forKey:AVNumberOfChannelsKey];
        [recordSettings setObject:[NSNumber numberWithInt:16] forKey:AVLinearPCMBitDepthKey];
        [recordSettings setObject:[NSNumber numberWithBool:NO] forKey:AVLinearPCMIsBigEndianKey];
        [recordSettings setObject:[NSNumber numberWithBool:NO] forKey:AVLinearPCMIsFloatKey];
    }
    else
    {
        NSNumber *formatObject;
        
        switch (recordEncoding) {
            case (ENC_AAC):
                formatObject = [NSNumber numberWithInt: kAudioFormatMPEG4AAC];
                break;
            case (ENC_ALAC):
                formatObject = [NSNumber numberWithInt: kAudioFormatAppleLossless];
                break;
            case (ENC_IMA4):
                formatObject = [NSNumber numberWithInt: kAudioFormatAppleIMA4];
                break;
            case (ENC_ILBC):
                formatObject = [NSNumber numberWithInt: kAudioFormatiLBC];
                break;
            case (ENC_ULAW):
                formatObject = [NSNumber numberWithInt: kAudioFormatULaw];
                break;
            default:
                formatObject = [NSNumber numberWithInt: kAudioFormatAppleIMA4];
        }
        
        [recordSettings setObject:formatObject forKey: AVFormatIDKey];
        [recordSettings setObject:[NSNumber numberWithFloat:44100.0] forKey: AVSampleRateKey];
        [recordSettings setObject:[NSNumber numberWithInt:2] forKey:AVNumberOfChannelsKey];
        [recordSettings setObject:[NSNumber numberWithInt:12800] forKey:AVEncoderBitRateKey];
        [recordSettings setObject:[NSNumber numberWithInt:16] forKey:AVLinearPCMBitDepthKey];
        [recordSettings setObject:[NSNumber numberWithInt: AVAudioQualityHigh] forKey: AVEncoderAudioQualityKey];
    }
    
    //    NSURL *url = [NSURL fileURLWithPath:[NSString stringWithFormat:@"%@/recordTest.caf", [[NSBundle mainBundle] resourcePath]]];
    NSArray *dirPaths = NSSearchPathForDirectoriesInDomains(
                                                            NSDocumentDirectory, NSUserDomainMask, YES);
    NSString *docsDir = [dirPaths objectAtIndex:0];
    NSString *soundFilePath = [docsDir
                               stringByAppendingPathComponent:@"recordTest.caf"];
    
    NSURL *url = [NSURL fileURLWithPath:soundFilePath];
    
    
    NSError *error = nil;
    audioRecorder = [[ AVAudioRecorder alloc] initWithURL:url settings:recordSettings error:&error];
    audioRecorder.meteringEnabled = YES;
    if ([audioRecorder prepareToRecord] == YES){
        audioRecorder.meteringEnabled = YES;
        [audioRecorder record];
        timerForPitch =[NSTimer scheduledTimerWithTimeInterval: 0.01 target: self selector: @selector(levelTimerCallback:) userInfo: nil repeats: YES];
    }else {
        int errorCode = CFSwapInt32HostToBig ([error code]);
        NSLog(@"Error: %@ [%4.4s])" , [error localizedDescription], (char*)&errorCode);
        
    }
    
}

- (void)levelTimerCallback:(NSTimer *)timer {
    
    self.isRecorded = NO;

	[audioRecorder updateMeters];
	NSLog(@"Average input: %f Peak input: %f", [audioRecorder averagePowerForChannel:0], [audioRecorder peakPowerForChannel:0]);
    
    float linear = pow (10, [audioRecorder peakPowerForChannel:0] / 20);
    NSLog(@"linear===%f",linear);
    float linear1 = pow (10, [audioRecorder averagePowerForChannel:0] / 20);
    NSLog(@"linear1===%f",linear1);
    if (linear1>0.03) {
        
        Pitch = linear1+.20;//pow (10, [audioRecorder averagePowerForChannel:0] / 20);//[audioRecorder peakPowerForChannel:0];
    }
    else {
        
        Pitch = 0.0;
    }
    //Pitch =linear1;
    NSLog(@"Pitch==%f",Pitch);
    _customRangeBar.value = Pitch;//linear1+.30;
    //[_progressView setProgress:Pitch];
    float minutes = floor(audioRecorder.currentTime/60);
    float seconds = audioRecorder.currentTime - (minutes * 60);
    
    NSString *time = [NSString stringWithFormat:@"%0.0f", seconds];
    [self.statusLabel setText:[NSString stringWithFormat:@"%@", time]];
    NSLog(@"recording");
    
}
-(IBAction) stopRecording
{
    self.isRecorded = YES;

    NSLog(@"stopRecording");
    // kSeconds = 0.0;
    self.viewForWave.hidden = YES;
    [audioRecorder stop];
    NSLog(@"stopped");
    [self stopDisplayLink];
    self.shapeLayer.path = [[self pathAtInterval:0] CGPath];
    [timerForPitch invalidate];
    timerForPitch = nil;
    _customRangeBar.value = 0.0;
}

- (void)doneRecording:(id)sender {
    
    NSArray *dirPaths = NSSearchPathForDirectoriesInDomains(
                                                            NSDocumentDirectory, NSUserDomainMask, YES);
    NSString *docsDir = [dirPaths objectAtIndex:0];
    NSString *soundFilePath = [docsDir
                               stringByAppendingPathComponent:@"recordTest.caf"];
    
    if (self.isRecorded) {
        [self.delegate voiceRecordingController:self didFinishRecording: soundFilePath ];
    } else {
        [self.delegate voiceRecordingController:self didFinishRecording:nil];
    }

}

-(IBAction) playRecording
{
    
    if (!self.isRecorded)
        return;
    
    NSLog(@"playRecording");
    // Init audio with playback capability
    AVAudioSession *audioSession = [AVAudioSession sharedInstance];
    [audioSession setCategory:AVAudioSessionCategoryPlayback error:nil];
    NSArray *dirPaths = NSSearchPathForDirectoriesInDomains(
                                                            NSDocumentDirectory, NSUserDomainMask, YES);
    NSString *docsDir = [dirPaths objectAtIndex:0];
    NSString *soundFilePath = [docsDir
                               stringByAppendingPathComponent:@"recordTest.caf"];
    
    NSURL *url = [NSURL fileURLWithPath:soundFilePath];
    
    // NSURL *url = [NSURL fileURLWithPath:[NSString stringWithFormat:@"%@/recordTest.caf", [[NSBundle mainBundle] resourcePath]]];
    NSError *error;
    audioPlayer = [[AVAudioPlayer alloc] initWithContentsOfURL:url error:&error];
    audioPlayer.numberOfLoops = 0;
    [audioPlayer play];
    NSLog(@"playing");
}

-(IBAction) stopPlaying
{
    NSLog(@"stopPlaying");
    [audioPlayer stop];
    NSLog(@"stopped");
    
}


- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end
