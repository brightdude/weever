//
//  GHViewController.m
//  GHWalkThrough
//
//  Created by Tapasya on 21/01/14.
//  Copyright (c) 2014 Tapasya. All rights reserved.
//

#import "WEIntroController.h"
#import "PMConstants.h"
#import "UIColor+UIColor_Additions.h"
#import "UIImage+Additions.h"


static NSString * const sampleDesc1 = @"Welcome to Weever";

static NSString * const sampleDesc2 = @"Weever is the easiest way to meet and connect with people around you";

static NSString * const sampleDesc3 = @"You can start and maintain conversations, exchange pictures, files and stay up to date.";

static NSString * const sampleDesc4 = @"You can anonymously join the conversations around you, and follow them even after you are no longer at the event.";

static NSString * const sampleDesc5 = @"Create your profile and start enjoying weever.";

@interface WEIntroController () <WEIntroDataSource>

@property (nonatomic, strong) WEIntroView* ghView ;

@property (nonatomic, strong) NSArray* descStrings;

@property (nonatomic, strong) UILabel* welcomeLabel;

@property (nonatomic, strong) NSArray* colorArray;


@end

@implementation WEIntroController

- (void)viewDidLoad
{
    [super viewDidLoad];
	// Do any additional setup after loading the view, typically from a nib.
    
    self.colorArray = [NSArray arrayWithObjects:[UIColor pmBackGroundColor], [UIColor pmNeutralColor], [UIColor pmColorGreen], [UIColor pmColorBlue], [UIColor pmOnColor], [UIColor pmColorExtra],  nil];
    
    
    _ghView = [[WEIntroView alloc] initWithFrame:self.view.bounds];
    
    [_ghView setDataSource:self];
    [_ghView setWalkThroughDirection:GHWalkThroughViewDirectionVertical];
    _ghView.delegate = self;
    UILabel* welcomeLabel = [[UILabel alloc] initWithFrame:CGRectMake(0, 0, 300, 50)];
    welcomeLabel.text = @"Welcome";
    welcomeLabel.font = [UIFont fontWithName:[UIFont pmControlTextFont] size:40];
    welcomeLabel.textColor = [UIColor whiteColor];
    welcomeLabel.textAlignment = NSTextAlignmentCenter;
    self.welcomeLabel = welcomeLabel;
    
    self.descStrings = [NSArray arrayWithObjects:sampleDesc1,sampleDesc2, sampleDesc3, sampleDesc4, sampleDesc5, nil];
    
    self.ghView.floatingHeaderView = nil;
    [self.ghView setWalkThroughDirection:GHWalkThroughViewDirectionHorizontal];
    
    [self.ghView showInView:self.view animateDuration:0.3];
    

}

#pragma mark - GHDataSource

- (WEIntroController*)initWithCompletionHandler:(void(^)(id result))handler {

    if (self=[super init]) {
        
        self.completionHandler = handler;

    }
    
    return self;
    
};

-(NSInteger) numberOfPages
{
    return 5;
}

-(void)walkthroughDidDismissView:(id)sender {
    
    if (self.completionHandler) {
        
        self.completionHandler (NO);
        //self.completionHandler = nil;
        
    }
    else {
        
        if (self.delegate)
            [self.delegate walkthroughDidDismissView:sender];
        
    }
}
- (void) configurePage:(WEIntroPageCell *)cell atIndex:(NSInteger)index
{
    cell.title = [NSString stringWithFormat:@"This is page %i", index+1];
    cell.titleImage = [UIImage imageNamed:[NSString stringWithFormat:@"title%i", index+1]];
    cell.desc = [self.descStrings objectAtIndex:index];
}

- (UIImage*) bgImageforPage:(NSInteger)index
{
//    NSString* imageName =[NSString stringWithFormat:@"bg_0%i.jpg", index+1];
//    UIImage* image = [UIImage imageNamed:imageName];
    UIImage* image = [UIImage imageWithColor:[self.colorArray objectAtIndex:index] size:self.view.bounds.size];
    return image;
}

- (void) tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
    [tableView deselectRowAtIndexPath:indexPath animated:YES];
    self.ghView.isfixedBackground = NO;

    switch (indexPath.row) {
        case 0:
            self.ghView.floatingHeaderView = nil;
            [self.ghView setWalkThroughDirection:GHWalkThroughViewDirectionHorizontal];
            break;
        case 1:
            self.ghView.floatingHeaderView = nil;
            [self.ghView setWalkThroughDirection:GHWalkThroughViewDirectionVertical];
            break;
        case 2:
        {
            [_ghView setFloatingHeaderView:self.welcomeLabel];
            [self.ghView setWalkThroughDirection:GHWalkThroughViewDirectionHorizontal];
        }
            break;
        case 3:
            [_ghView setFloatingHeaderView:self.welcomeLabel];
            self.ghView.isfixedBackground = YES;
            self.ghView.bgImage = [UIImage imageNamed:@"static_bg_01"];
            [self.ghView setWalkThroughDirection:GHWalkThroughViewDirectionVertical];
    
            break;
            
        default:
            break;
    }
    
    [self.ghView showInView:self.navigationController.view animateDuration:0.3];

}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end
