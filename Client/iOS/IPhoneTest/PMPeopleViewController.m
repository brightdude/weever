//
//  PMPeopleViewControllerTableViewController.m
//  weever
//
//  Created by Ilia Ridge on 4/13/14.
//  Copyright (c) 2014 Luwei. All rights reserved.
//

#import "PMPeopleViewController.h"

@interface PMPeopleViewController ()

@end

@implementation PMPeopleViewController

- (void)viewDidLoad
{
    [super viewDidLoad];
    
    // Uncomment the following line to preserve selection between presentations.
    // self.clearsSelectionOnViewWillAppear = NO;
    
    // Uncomment the following line to display an Edit button in the navigation bar for this view controller.
    // self.navigationItem.rightBarButtonItem = self.editButtonItem;
    
    [self.tableView registerNib:[UINib nibWithNibName:@"PMPersonListCellTableViewCell" bundle:nil]
         forCellReuseIdentifier:@"PersonCell"];
    
    
    self.mpcHandler = [(AppDelegate*)[[UIApplication sharedApplication] delegate] mpcHandler];
    
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(onPeerChange:)
                                                 name:PeerFoundNotification
                                               object:nil];
    
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(onPeerChange:)
                                                 name:PeerLostNotification
                                               object:nil];
    


}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

-(void) onPeerChange:(id)sender {
    [self.tableView reloadData];
}

#pragma mark - Table view data source

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView
{
    // Return the number of sections.
    return 2;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
{
    // Return the number of rows in the section.
    if (section == 0)
        return [self.mpcHandler.availablePeers count];
    else
        return [self.mpcHandler.connectedPeers count];

}

- (NSString *)tableView:(UITableView *)tableView titleForHeaderInSection:(NSInteger)section {

  if (section ==0)
      if ([self.mpcHandler.availablePeers count] > 0)
          return @"Nearby Weevers";
      else
          return nil;
  else
      if ([self.mpcHandler.connectedPeers count] > 0)
          return @"Connected Weevers";
      else
          return nil;

}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    PMPersonListCell *cell = [tableView dequeueReusableCellWithIdentifier:@"PersonCell" forIndexPath:indexPath];
    
    // Configure the cell...
    NSString* userKey = [[self.mpcHandler.availablePeers objectAtIndex:indexPath.row] objectForKey:@"user"];
    //WEUser* user = [[(AppDelegate*)[[UIApplication sharedApplication] delegate] userCache] userForId:userKey];
    
    WEUser* user = [WEUser alloc];
    [user initWithId:userKey withCompletionBlock:^(id result){
        [cell.nameLabel setText:[NSString stringWithFormat:@"%@ %@", user.firstName , user.lastName]];
        [cell.avatarView setImage:user.avatarImage];
    }];
    
//    [cell.nameLabel setText:];

    return cell;
}

/*
// Override to support conditional editing of the table view.
- (BOOL)tableView:(UITableView *)tableView canEditRowAtIndexPath:(NSIndexPath *)indexPath
{
    // Return NO if you do not want the specified item to be editable.
    return YES;
}
*/

/*
// Override to support editing the table view.
- (void)tableView:(UITableView *)tableView commitEditingStyle:(UITableViewCellEditingStyle)editingStyle forRowAtIndexPath:(NSIndexPath *)indexPath
{
    if (editingStyle == UITableViewCellEditingStyleDelete) {
        // Delete the row from the data source
        [tableView deleteRowsAtIndexPaths:@[indexPath] withRowAnimation:UITableViewRowAnimationFade];
    } else if (editingStyle == UITableViewCellEditingStyleInsert) {
        // Create a new instance of the appropriate class, insert it into the array, and add a new row to the table view
    }   
}
*/

/*
// Override to support rearranging the table view.
- (void)tableView:(UITableView *)tableView moveRowAtIndexPath:(NSIndexPath *)fromIndexPath toIndexPath:(NSIndexPath *)toIndexPath
{
}
*/

/*
// Override to support conditional rearranging of the table view.
- (BOOL)tableView:(UITableView *)tableView canMoveRowAtIndexPath:(NSIndexPath *)indexPath
{
    // Return NO if you do not want the item to be re-orderable.
    return YES;
}
*/

#pragma mark - Table view delegate

// In a xib-based application, navigation from a table can be handled in -tableView:didSelectRowAtIndexPath:
- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
    // Navigation logic may go here, for example:
    // Create the next view controller.
    NSLog (@"index path selected section %i , row %i" , indexPath.section , indexPath.row );

    if (indexPath.section == 0) {
            NSString* userKey = [[self.mpcHandler.availablePeers objectAtIndex:indexPath.row] objectForKey:@"user"];
            
            PMProfileController* userProfile = [PMProfileController alloc];
            [userProfile initWithId:userKey withCompletionBlock:^(id result){
                
                userProfile.navigationController.navigationBarHidden = NO;
                [self presentViewController:userProfile animated:YES completion:nil];
                
            }];
    }
    
    
}

@end
