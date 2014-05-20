//
//  PMChannelViewController.m
//  ProxiMore
//
//  Created by Ilia Ridge on 3/15/14.
//  Copyright (c) 2014 Luwei. All rights reserved.
//

#import "PMChannelViewController.h"
#import "UIScrollView+APParallaxHeader.h"
#import "PMChannelHeaderView.h"
#import "PMPostCell.h"
#import "IQFeedbackView.h"
#import "PMConstants.h"

@interface PMChannelViewController ()

@end

@implementation PMChannelViewController

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
    }
    return self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(onUpdateComplete:)
                                                 name:CompletePostMessageNotification
                                               object:nil];
    
    
    
    self.table = [[UITableView alloc] initWithFrame:self.view.frame style:UITableViewStylePlain];
    
    PMChannelHeaderView* header = [[PMChannelHeaderView alloc] initWithFrame:CGRectMake(0, 0, 320, 320)];
    [header setChannel:self.channel];
    [header setUpView];
    //[self.table addParallaxWithImage:[UIImage imageNamed:@"Profile_image.png"] andHeight:320];
    [self.table addParallaxWithImage:[header asImage] andHeight:320];
    //[self.view addSubview:header];
    
    
    self.table.autoresizingMask = UIViewAutoresizingFlexibleHeight|UIViewAutoresizingFlexibleWidth;
    [self.table setBackgroundColor:[UIColor clearColor]];
    self.table.separatorStyle = UITableViewCellSeparatorStyleNone;
    
    self.table.delegate = self;
    self.table.dataSource = self;
    
    UINib *cellNib = [UINib nibWithNibName:@"PMPostCell" bundle:nil];
    [self.table registerNib:cellNib forCellReuseIdentifier:@"postCell"];

    UIView* bottomBar = [[UIView alloc] init];
    bottomBar.frame = CGRectMake(0, self.view.frame.size.height - 48, self.view.frame.size.width, 48);
    bottomBar.backgroundColor = [UIColor whiteColor];
    
    
    UIButton *backButton = [UIButton buttonWithType:UIButtonTypeCustom];
    backButton.frame = CGRectMake(0, 0, 48, 48);
    [backButton addTarget:self action:@selector(dismissViewTapped) forControlEvents:UIControlEventTouchUpInside];
    backButton.showsTouchWhenHighlighted = YES;
    
    UIImage *backButtonImage = [UIImage imageNamed:@"close-512"];
    [backButton setImage:backButtonImage forState:UIControlStateNormal];
    
    UIButton *followButton = [UIButton buttonWithType:UIButtonTypeCustom];
    followButton.frame = CGRectMake(self.view.frame.size.width / 2 - 24, 0, 48, 48);
    [followButton addTarget:self action:@selector(followChannelTapped) forControlEvents:UIControlEventTouchUpInside];
    followButton.showsTouchWhenHighlighted = YES;
    
    UIImage *followButtonImage = [UIImage imageNamed:@"visible-512.png"];
    [followButton setImage:followButtonImage forState:UIControlStateNormal];

    UIButton *postButton = [UIButton buttonWithType:UIButtonTypeCustom];
    postButton.frame = CGRectMake(self.view.frame.size.width - 48, 0, 48, 48);
    [postButton addTarget:self action:@selector(postChannelTapped) forControlEvents:UIControlEventTouchUpInside];
    postButton.showsTouchWhenHighlighted = YES;
    
    UIImage *postButtonImage = [UIImage imageNamed:@"plus-512.png"];
    [postButton setImage:postButtonImage forState:UIControlStateNormal];
    
    //NSLog(@"CVC data - %@" , self.channel);

    
    
    //[self.navigationController.toolbarItems :backBarButtonItem];
    
    backButton.imageEdgeInsets = UIEdgeInsetsMake(10, 10, 10, 10);
    
    [bottomBar addSubview:backButton];
    [bottomBar addSubview:followButton];
    [bottomBar addSubview:postButton];
    
    [self.view addSubview:self.table];
    
    [self.view addSubview:bottomBar];

    
}

-(void) onUpdateComplete:(id)result {
    
    NSDictionary *userInfo = [result userInfo];
    
    
    [self.table reloadData];
    
}

-(void) dismissViewTapped {
    [self dismissViewControllerAnimated:YES completion:^{}];
}

-(void) followChannelTapped {
    
    
    NSDictionary *parameters = @{
                                 @"channel" : [self.channel objectForKey:@"_id"],
                                 };
    
    NSLog(@"subscribe params: %@" , parameters);
    
    [[NSNotificationCenter defaultCenter] postNotificationName:StartSubscribeChannelNotification object:self userInfo:parameters];
    
    [self dismissViewControllerAnimated:YES completion:^{}];
}

-(void) postChannelTapped {
    // [self dismissViewControllerAnimated:YES completion:^{}];
    
    IQFeedbackView *bugReport = [[IQFeedbackView alloc] initWithTitle:@"" message:nil image:nil cancelButtonTitle:@"Cancel" doneButtonTitle:@"Post"];

    [bugReport setControlType:1];
    [bugReport setCanAddImage:YES];
    [bugReport setCanEditText:YES];
    
    [bugReport showInViewController:self completionHandler:^(BOOL isCancel, NSString *message, UIImage *image, NSDictionary* returnValues) {
        [bugReport dismiss];
        
        if (!isCancel) {
            
            id d = [[UIApplication sharedApplication] delegate];
            
            NSDictionary *parameters = @{
                                         @"channel": [self.channel objectForKey:@"_id"],
                                         @"message" : [returnValues objectForKey:@"message"],
                                         @"color" : [returnValues objectForKey:@"color"],//,
                                         @"image" : [returnValues objectForKey:@"image"],
                                         @"recording" : [returnValues objectForKey:@"recording"],
                                         @"pin" : [returnValues objectForKey:@"pin"],
                                         @"type" : [returnValues objectForKey:@"type"]
                                         //@"loc" :  @[[NSNumber numberWithDouble:[d lastLocation].coordinate.longitude] , [NSNumber numberWithDouble: [d lastLocation].coordinate.atitude]]
                                         };
            
//            NSLog(@"post params: %@" , parameters);
            
            [[NSNotificationCenter defaultCenter] postNotificationName:StartPostMessageNotification object:self userInfo:parameters];
            
            
        }
        
        
    }];

}



- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    NSArray* messages = [self.channel objectForKey:@"messages"];
    return [messages count];
}

- (NSIndexPath *)tableView:(UITableView *)tv willSelectRowAtIndexPath:(NSIndexPath *)path
{
    return nil;
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    
    static NSString *cellIdentifier = @"postCell";
    
    NSArray* messages = [self.channel objectForKey:@"messages"];
    NSDictionary* message = [messages objectAtIndex:indexPath.row];

    
    PMPostCell *cell = [tableView dequeueReusableCellWithIdentifier:cellIdentifier];
    [cell setMessage:message];
    
    [cell.title setText:[message objectForKey:@"content"]];
    
    NSLog(@"message %i - %@ " , indexPath.row, cell.message);

    //cell.delegate = self;
    
    // Fix for iOS 7 to clear backgroundColor
//    cell.backgroundColor = [UIColor clearColor];
//    cell.backgroundView = [UIView new];
//    cell.selectedBackgroundView = [UIView new];
    
    cell.selectionStyle = UITableViewCellSelectionStyleNone;
    
    return cell;
}

- (CGFloat)tableView:(UITableView *)tableView
heightForRowAtIndexPath:(NSIndexPath
                         *)indexPath {
    return 44;
}



- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void)scrollViewDidScroll:(UIScrollView *)scrollView {
 
  //   MyCustomNavController* navController = (MyCustomNavController*)self.parentViewController;
    if( [scrollView.panGestureRecognizer translationInView:self.view].y  < 0.0f ) {
 //       [navController setExpanded:YES animated:YES];
    } else if ([scrollView.panGestureRecognizer translationInView:self.view].y  > 0.0f  ) {
 //       [navController setExpanded:NO animated:YES];
    }
    
}
/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender
{
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
