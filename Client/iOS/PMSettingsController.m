//
//  PMSettingsController.m
//  weever
//
//  Created by Ilia Ridge on 4/5/14.
//  Copyright (c) 2014 Luwei. All rights reserved.
//

#import "PMSettingsController.h"
#import "SettingsCell1.h"
#import "Utils.h"
#import "RCSwitchOnOff.h"
#import "FlatTheme.h"
#import "UIColor+UIColor_Additions.h"
#import "UIImage+Additions.h"
#import "AppDelegate.h"


@interface PMSettingsController ()

@property (nonatomic, strong) NSMutableArray* settingsElements;

@property (nonatomic, strong) NSString* boldFontName;

@property (nonatomic, strong) UIColor* onColor;

@property (nonatomic, strong) UIColor* offColor;

@property (nonatomic, strong) UIColor* dividerColor;

@end

@implementation PMSettingsController

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
    }
    return self;
}

-(void) viewWillAppear:(BOOL)animated {
    self.navigationController.navigationBarHidden = NO;
}

-(void) dismissViewTapped:(id)sender {
    
    [((AppDelegate*)[[UIApplication sharedApplication] delegate]).currentUser save:^(id result) {
        
    }];
    
    [self dismissViewControllerAnimated:YES completion:nil];
    
}

- (void)viewDidLoad
{
    [super viewDidLoad];
	
    
    self.boldFontName = @"Avenir-Black";
    
    UIButton *backButton = [UIButton buttonWithType:UIButtonTypeCustom];
    backButton.frame = CGRectMake(0, 6, 48, 48);
    [backButton addTarget:self action:@selector(dismissViewTapped:) forControlEvents:UIControlEventTouchUpInside];
    backButton.showsTouchWhenHighlighted = YES;
    
    [backButton setImage:[UIImage imageNamed:@"left-512" tintColor:[UIColor pmOnColor] style:UIImageTintedStyleKeepingAlpha] forState:UIControlStateNormal];
    [backButton setImage:[UIImage imageNamed:@"left-512" tintColor:[UIColor pmOffColor] style:UIImageTintedStyleKeepingAlpha] forState:UIControlStateHighlighted];
    
    
    backButton.imageEdgeInsets = UIEdgeInsetsMake(10, 10, 10, 10);
    
    [self.view addSubview:backButton];

    
    
    self.onColor = [UIColor colorWithRed:222.0/255 green:59.0/255 blue:47.0/255 alpha:1.0f];
    self.offColor = [UIColor colorWithRed:242.0/255 green:228.0/255 blue:227.0/255 alpha:1.0];
    self.dividerColor = [UIColor whiteColor];
    
//    [FlatTheme styleNavigationBarWithFontName:self.boldFontName andColor:self.onColor];
//    [FlatTheme styleSegmentedControlWithFontName:self.boldFontName andSelectedColor:self.onColor andUnselectedColor:self.offColor andDidviderColor:self.dividerColor];
    
    self.navigationItem.leftBarButtonItem = [Utils getMenuItem];
    self.navigationItem.rightBarButtonItem  = [Utils getSearchButtonItem];
    
    self.title = @"Settings";
    
    self.tableView = [[UITableView alloc] initWithFrame:CGRectMake(0, 48, 320, [self.view bounds].size.height - 48) style:UITableViewStyleGrouped];
    self.tableView.autoresizingMask = UIViewAutoresizingFlexibleHeight | UIViewAutoresizingFlexibleWidth;
    
    [self.view addSubview:self.tableView];
    
    self.tableView.dataSource = self;
    self.tableView.delegate = self;
    self.tableView.backgroundView = nil;
    [self.tableView setUserInteractionEnabled:YES];
    
    
    self.tableView.backgroundColor = [UIColor colorWithRed:231.0/255 green:235.0/255 blue:238.0/255 alpha:1.0f];
    self.tableView.separatorColor = [UIColor clearColor];
    

    self.settingsElements = ((AppDelegate*)[[UIApplication sharedApplication] delegate]).currentUser.settingsElements;
    
    UISwipeGestureRecognizer* recognizerLeft = [[UISwipeGestureRecognizer alloc] initWithTarget:self action:@selector(handleSwipeLeft:)];
    [recognizerLeft setDirection:(UISwipeGestureRecognizerDirectionLeft)];
    [self.view addGestureRecognizer:recognizerLeft];

    
}

-(NSInteger)numberOfSectionsInTableView:(UITableView *)tableView{
    
    return [self.settingsElements count];
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section{
    
    return [[[self.settingsElements objectAtIndex:section] objectForKey:@"items"] count];
    
}

- (UIView *)tableView:(UITableView *)tableView viewForHeaderInSection:(NSInteger)section {
    
    UIView* headerView = [[UIView alloc] initWithFrame:CGRectMake(0, 0, 320, 50)];
    headerView.backgroundColor = [UIColor clearColor];
    
    
    UILabel* label = [[UILabel alloc] initWithFrame:CGRectMake(30, 9, 200, 40)];
    label.backgroundColor = [UIColor clearColor];
    label.font = [UIFont fontWithName:self.boldFontName size:20.0f];
    label.textColor = self.onColor;
    
    label.text = [[self.settingsElements objectAtIndex:section] objectForKey:@"title"];
    
    [headerView addSubview:label];
    
    return headerView;
}

- (CGFloat)tableView:(UITableView *)tableView heightForHeaderInSection:(NSInteger)section{
    return 50;
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath{
    
    UITableViewCell* cell = [[UITableViewCell alloc] initWithStyle:UITableViewCellStyleDefault reuseIdentifier:@"Cell"];
    
    NSArray* element = [[[self.settingsElements objectAtIndex:indexPath.section] objectForKey:@"items"] objectAtIndex:indexPath.row];

    
    NSString* title = [element objectAtIndex:0];
    
    cell.textLabel.text = [title uppercaseString];
    cell.textLabel.textColor = [UIColor colorWithWhite:0.5 alpha:1.0f];
    cell.textLabel.font = [UIFont fontWithName:self.boldFontName size:12.0f];
    
    
    if([[element objectAtIndex:2]  isEqualToString:@"Switch"]){
        
        RCSwitchOnOff* cellSwitch = [self createSwitch];
        cellSwitch.tag = 10*indexPath.section + indexPath.row;
        cellSwitch.on = [[element objectAtIndex:1] boolValue];
        [cellSwitch addTarget:self action:@selector(settingsValueChanged:) forControlEvents:UIControlEventValueChanged];
        [cell addSubview:cellSwitch];
    }
    else if ([[element objectAtIndex:2] isEqualToString:@"Segment"]){
        
        UISegmentedControl* control = [self createSegmentedControlWithItems:[element objectAtIndex:3]];
        control.selectedSegmentIndex = [[element objectAtIndex:1] integerValue];
        [control addTarget:self action:@selector(settingsValueChanged:) forControlEvents:UIControlEventValueChanged];
        control.tag = indexPath.row;

        [cell addSubview:control];
    }
    else{
        cell.accessoryType = UITableViewCellAccessoryDisclosureIndicator;
    }
    
    return cell;
}

-(void)settingsValueChanged:(id)sender {
    
    int row = [sender tag] % 10;
    int section = ([sender tag] - row) / 10;
    
    NSMutableArray* element = [[[[self.settingsElements objectAtIndex:section] objectForKey:@"items"] objectAtIndex:row] mutableCopy];
    
    int value;
    if([[element objectAtIndex:2]  isEqualToString:@"Switch"]){
        value = ((UISwitch*)sender).on ? 1 : 0;
    }
    
    if([[element objectAtIndex:2]  isEqualToString:@"Segment"]){
        value = ((UISegmentedControl*)sender).selectedSegmentIndex;
    }
    
    [element setObject:[NSNumber numberWithInt:value] atIndexedSubscript:1];
    
    NSMutableArray* result = [[NSMutableArray alloc] init];
    
    for (int i = 0; i < [self.settingsElements count]; i++) {
        if (i!=section)
            [result addObject:[self.settingsElements objectAtIndex:i]];
        else {
            NSMutableDictionary* dict = [[NSMutableDictionary alloc] init];
            
            id items = [[self.settingsElements objectAtIndex:i] objectForKey:@"items"];
            id title = [[self.settingsElements objectAtIndex:i] objectForKey:@"title"];
            
            [dict setObject:title forKey:@"title"];
            
            NSMutableArray* newArray = [[NSMutableArray alloc] init];
            
            for (int j = 0; j < [items count]; j++) {
                if (j!=row)
                    [newArray addObject:[items objectAtIndex:j]];
                else
                    [newArray addObject:element];
                
            }
            
            [dict setObject:newArray forKey:@"items"];
            
            [result addObject:dict];
            
        }
    }
    
    //[[[self.settingsElements objectAtIndex:section] objectForKey:@"items"]   replaceObjectAtIndex:row withObject:element];
    
    self.settingsElements = result;
    
    ((AppDelegate*)[[UIApplication sharedApplication] delegate]).currentUser.settingsElements = result;
    
    [self.tableView reloadData];
    
    // NSLog (@"result is %@" , result );
    
}


-(RCSwitchOnOff*)createSwitch{
    
    FlatTheme* theme = [[FlatTheme alloc] init];
    theme.switchOnBackground = [Utils drawImageOfSize:CGSizeMake(70, 30) andColor:self.onColor];
    theme.switchOffBackground = [Utils drawImageOfSize:CGSizeMake(70, 30) andColor:self.onColor];
    theme.switchThumb = [Utils drawImageOfSize:CGSizeMake(30, 29) andColor:self.offColor];
    theme.switchTextOffColor = [UIColor whiteColor];
    theme.switchTextOnColor = [UIColor whiteColor];
    theme.switchFont = [UIFont fontWithName:self.boldFontName size:12.0f];
    
    RCSwitchOnOff* settingSwitch = [[RCSwitchOnOff alloc] initWithFrame:CGRectMake(230, 7, 70, 30) andTheme:theme];
    return settingSwitch;
}

-(UISegmentedControl*)createSegmentedControlWithItems:(NSArray*)items{
    
    UISegmentedControl* segmentedControl = [[UISegmentedControl alloc] initWithItems:items];
    
    segmentedControl.frame = CGRectMake(150, 7, 150, 30);
    segmentedControl.selectedSegmentIndex = 0;
    
    return segmentedControl;
}

-(void) handleSwipeLeft:(UISwipeGestureRecognizer*)recognizer {
    [self dismissViewControllerAnimated:YES completion:nil];
}



- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end
