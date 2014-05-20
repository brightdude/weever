//
//  ViewController.h
//  TabHoldandRecord
//
//  Created by Ashish Tripathi on 12/08/13.
//  Copyright (c) 2013 Ashish Tripathi. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <AVFoundation/AVFoundation.h>
#import "F3BarGauge.h"
#import "WEProtocols.h"
#import "CERoundProgressView.h"
#import "UIColor+UIColor_Additions.h"


@interface AViewController : UIViewController<UIGestureRecognizerDelegate>{
    
    AVAudioPlayer *audioPlayer;
    AVAudioRecorder *audioRecorder;
    int recordEncoding;
    enum
    {
        ENC_AAC = 1,
        ENC_ALAC = 2,
        ENC_IMA4 = 3,
        ENC_ILBC = 4,
        ENC_ULAW = 5,
        ENC_PCM = 6,
    } encodingTypes;
    
    float Pitch;
    NSTimer *timerForPitch;
}

@property (strong, nonatomic) IBOutlet UIImageView *imageView;
@property (strong, nonatomic) IBOutlet NSTimer *timer;
@property (nonatomic) float progress;
@property (strong, nonatomic) IBOutlet CERoundProgressView *progressView;
@property (strong, nonatomic) IBOutlet UIButton *touchbutton;
@property (strong, nonatomic) IBOutlet UIView *viewForWave;
@property (strong, nonatomic) IBOutlet UIView *viewForWave2;
@property (nonatomic) CFTimeInterval firstTimestamp;
@property (nonatomic, strong) CAShapeLayer *shapeLayer;
@property (nonatomic, strong) CADisplayLink *displayLink;
@property (nonatomic, strong) IBOutlet UILabel *statusLabel;
@property (retain, nonatomic) IBOutlet F3BarGauge *customRangeBar;
@property (nonatomic) NSUInteger loopCount;
@property (retain, nonatomic) UIImageView* playButton;
@property (nonatomic , strong) id<AVRecorderDelegate>  delegate;
@property (nonatomic) BOOL isRecorded;

-(IBAction) startRecording;
-(IBAction) stopRecording;
-(IBAction) playRecording;
-(IBAction) stopPlaying;

-(id) initWithRect:(CGRect)rect;


@end
