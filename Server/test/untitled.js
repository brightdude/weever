{
	"docs": [{
		"desc": "Returns a list of Meetup group categories",
		"param_notes": "No parameters required parameters",
		"params": {
			"fields": "Parameter for requesting optional response properties"
		},
		"api_version": "2",
		"formats": ["json", "xml"],
		"http_method": "GET",
		"response": {
			"id": "Numeric identifier of the category",
			"name": "Display name of the category",
			"shortname": "String identifier of the category"
		},
		"scopes": ["basic"],
		"name": "Categories",
		"path": "\/2\/categories",
		"orders": {
			"member": "order by recommendations for authorized member (deprecated)",
			"shortname": "(default order) ascending"
		},
		"examples": "",
		"group": "categories"
	}, {
		"desc": "A dashboard of aggregated Meetup information for the authorized member",
		"param_notes": "no parameters are required",
		"params": {
			"fields": "Request that additional fields (separated by commas) be included in the output"
		},
		"api_version": "3",
		"formats": ["json"],
		"response": {
			"last_event": ["The last meetup the current member RSVP'd to", {
				"visibility": "Event visibility: \"public\", \"members\" or \"public_limited\". Events in private groups that do not expose limited information are visible only to that group's members and should not be made public.",
				"is_simplehtml": "Optional field, \"true\" when the event has been saved in a simplified HTML format, \"false\" otherwise.",
				"self": ["Optional field with details particular to the authorized user, only present if requested and user is a member of the hosting group", {
					"checked_in": "Boolean indicator of the current member's check-in status",
					"watching": "For events without waitlist you may check your watchlist status with this property. Values may either be true of false.",
					"rsvp": ["Member's RSVP, if any", {
						"response": "\"yes\", \"no\", or \"waitlist\"",
						"answers": "Array of answers to event survey questions",
						"guests": "number of guests"
					}],
					"role": "The authenticated member's role in within the group, if any. This may be one of: Organizer, Assistant Organizer, Event Organizer, etc.",
					"rated": "Boolean indicator of whether the current member rated the event or not",
					"actions": "list of actions the current user may perform, potentially: \"announce\" to announce the event to the group's members, \"attendance\" to view or take attendance for the event, \"payments\" to mark members as paid if the event is a paid event, \"publish\" to publish a draft event, \"edit\" to edit the event information, \"edit_hosts\" to edit the hosts for the event, \"delete\" to delete the event, \"rsvp\" to RSVP yes or no to the event, or \"wait\" to get on the waiting list (using the same RSVP methods). For events without a waitlist, you may see either \"watch\" or \"unwatch\" to watch for opening spots for the event when the event is full. If an organizer requires membership dues to rsvp and the authorized member has not paid theirs, \"dues\" will be included",
					"pay_status": "The authenticated member's payment status. This may be one of 'none', 'paid', 'partially_paid', 'payment_pending', 'echeck_pending', 'refund_pending', 'partially_refunded', 'refunded'."
				}],
				"featured": "Optional fields parameter which returns \"true\" if the event is featured and \"false\" otherwise",
				"rsvpable": "Indicates if the currently authenticated member can RSVP or not, only returned if requested in the fields parameter",
				"publish_status": "\"published\" or \"draft\" only visible to organizers",
				"email_reminders": "Optional fields parameter limited to organizers and event hosts, if false, event reminders are disabled",
				"rsvp_rules": ["Conditions set by the organizer, only returned if requested in the fields parameter.", {
					"open_time": "UTC time that members may begin to RSVP",
					"close_time": "UTC time that RSVPs will no longer be accepted, though organizers may close RSVPs earlier",
					"waitlisting": "Wait list handling when RSVP limit is reached. Value may be one of \"auto\", \"manual\" or \"off\"",
					"guest_limit": "Number of guests members may include in their RSVP, 0 or more",
					"closed": "Flag indicating that RSVPing is closed for the event. 1 is true 0 is false",
					"refund_policy": ["The organizer-defined terms for refunds. If this is defined, you must provide the authenticated member a way to access this information before they can RSVP. They will need to agree to these terms before they RSVP", {
						"days": "if member_cancellation is present, it's relative to this many days before the event",
						"notes": "additional refund policy notes",
						"policies": " list of one or more of the following. 'no_refunds' if the organizer will not issue refunds', 'member_cancellation' if the organizer offers a refund for member cancellation, 'event_cancellation' if the organizer offers a refund if the event is canceled, 'event_rescheduled' if the organizer offers a refund when the event is rescheduled"
					}]
				}],
				"id": "The event id. May be numeric or alphanumeric, always served as a string",
				"distance": "Distance in miles from the search location, if one was specified",
				"timezone": "Returned when \"timezone\" is provided in fields parameter. This represents the universal timezone identifier for the host group",
				"time": "UTC start time of the event, in milliseconds since the epoch",
				"venue_visibility": "Set to \"members\" or \"public\". The \"venue\" element will not be present if the visibility is \"members\" and the current authenticated user is not a member of the group hosting the event. This value is only returned if requested in the fields parameter",
				"updated": "UTC last modified time of the event, in milliseconds since the epoch",
				"yes_rsvp_count": "Number of yes RSVPs including guests",
				"created": "UTC creation time of the event, in milliseconds since the epoch",
				"description": "Description of the event",
				"survey_questions": ["Optional \"fields\" response property for event with surveys", {
					"id": "Question identifier",
					"question": "Question text",
					"required": "Flag indicating if a response to this question is required to RSVP. Currently always false."
				}],
				"name": "The name of the event",
				"headcount": "The number of members in attendance according to the attendance taker. This may be 0 if attendance has not yet been taken",
				"photo_album_id": "optional fields parameter which returns the ID of the photo album for this event, if one exists",
				"rsvp_alerts": "Optional fields parameter limited to organizers and event hosts, if false, member RSVP alerts are disabled",
				"photo_count": "Optional field, number of photos posted to the event",
				"comment_count": "Optional field, number of comments posted to the event",
				"rsvp_limit": "The number of \"yes\" RSVPs an event can have before members will be added to the waiting list",
				"trending_rank": "Indicates the trending rank within the current result set. The best rank is zero, increasing rank values are less \"trending\". This value is only returned if requested in the fields parameter",
				"status": "\"cancelled\", \"upcoming\", \"past\", \"proposed\", \"suggested\" or \"draft\"",
				"maybe_rsvp_count": "Number of maybe RSVPs including guests",
				"photo_url": "URL of the event photo, if one exists",
				"venue": ["Venue, if selected and not hidden", {
					"id": "Venue id",
					"zip": "ZIP code if, venue is in US or Canada",
					"phone": "Phone number of venue",
					"address_3": "Line 3 of venue address",
					"repinned": "true if the editor of the event altered the original venues pin location, false otherwise",
					"city, state, country": "City, Country and if in US state of venue",
					"lat, lon": "Geographic coordinates of venue",
					"name": "Venue name",
					"address_1": "Line 1 of venue address",
					"address_2": "Line 2 of venue address"
				}],
				"short_link": "Optional field. If hosting group is private, this will return the group's short_link",
				"event_hosts": ["List of members hosting the event, only returned if requested in the fields parameter.", {
					"member_name": "The host's member name",
					"member_id": "The host's member id"
				}],
				"fee": ["Fee info returned when payment is defined", {
					"amount": "Amount of the fee",
					"description": "Fee description, typically \"per person\"",
					"label": "Fee label, typically \"Price\"",
					"required": "\"1\" if payment is required to RSVP, \"0\" otherwise",
					"accepts": "Accepted method of payment. Can be one of \"paypal\", \"amazon\", or \"cash\"",
					"currency": "Currency accepted for fee"
				}],
				"utc_offset": "The local offset from UTC time, in milliseconds",
				"duration": "Event duration in milliseconds, if an end time is specified by the organizer. When not present, a default of 3 hours may be assumed by applications.",
				"announced": "Organizers and hosts can see if the event was announced",
				"event_url": "URL of the event's page on meetup.com",
				"how_to_find_us": "The information provided by the event host for \"How will members find you there?\". Visible when location is visible to the authenticated member",
				"rating": ["Only past events have this field, an aggregate of anonymous ratings", {
					"count": "Number of ratings been collected",
					"average": "Average of collected ratings"
				}],
				"group": ["Group that is hosting the event", {
					"id": "Group id",
					"category": ["Optional field. Category of this group", {
						"id": "Numeric identifier of the category",
						"name": "Display name of the category",
						"shortname": "String identifier of the category"
					}],
					"topics": ["Optional field. Topics related to this group", {
						"id": "Topic ID",
						"urlkey": "Unique keyword used to identify this topic",
						"name": "Topic name"
					}],
					"group_photo": ["Optional field, photo for the group hosting the event", {
						"photo_link": "URL for a standard size of the photo",
						"highres_link": "URL for the photo at its maximum size",
						"thumb_link": "URL for a thumbnail of the photo",
						"photo_id": "-"
					}],
					"group_lat": "Approximate group latitude",
					"name": "Group name",
					"group_lon": "Approximate group longitude",
					"join_mode": "\"open\", \"approval\", or \"closed\"",
					"membership_dues": ["Optional field returned when fields parameter is set to group_membership_dues", {
						"methods": "Array of acceptable payment methods. May be one or more of \"amazon_payments\", \"paypal\", \"credit_card\" or \"other\"",
						"fee": "Numeric fee value",
						"trial_days": "When present, returns the number of days the group is offering a free trial period for to new members. When not present, this indicates that the group does not offer a trial membership period",
						"required": "\"2\" if dues are required to join, \"1\" if dues are required to RSVP, \"0\" otherwise",
						"fee_desc": "Description of fee",
						"refund_policy": "Array of payment refund policies. May be one or more of \"none\", \"member_leaves\", \"group_closes\", \"member_banned\", or \"custom\"",
						"currency": "Currency fee is declared as"
					}],
					"urlname": "Group URL name",
					"who": "What the group calls its members"
				}],
				"simple_html_description": "Optional field, description of the event in simple HTML format.",
				"why": "We should do this because..."
			}],
			"service_status": ["An optional field which represents the current API service status", {
				"message": "A human displayable message",
				"status": "May be one of 'ok', 'notice', or 'unavailable'"
			}],
			"notifications": ["Optional field for including a list of member notifications", {
				"id": "A unique identifier for a notification",
				"text": "Notification content as text",
				"updated": "The last time the notification was modified, indicated as the time in milliseconds since the epoch",
				"link": "Link to resource notification was triggered by",
				"photo": ["A photo related to the notification. Potentially absent", {
					"photo_link": "URL for a standard size of the photo",
					"highres_link": "URL for the photo at its maximum size",
					"thumb_link": "URL for a thumbnail of the photo",
					"photo_id": "Photo ID"
				}],
				"kind": "Identifier indicating the kind of notification"
			}],
			"stats": ["A map of statistics for the current member", {
				"city_top_groups": "Number of top groups in the member's city",
				"global_top_groups": "Number of top groups globally",
				"nearby_events": "Number of upcoming events in the member\\s local area, returned when there are no upcoming events",
				"memberships": "Number of Meetup groups member is in",
				"upcoming_events": "Number of upcoming Meetup events in member's groups",
				"fb_friend_events": "Number of upcoming events Facebook friends of the current member are attending returned when there are no upcoming events"
			}],
			"next_event": ["The next meetup event the current member has RSVP'd to", {
				"visibility": "Event visibility: \"public\", \"members\" or \"public_limited\". Events in private groups that do not expose limited information are visible only to that group's members and should not be made public.",
				"is_simplehtml": "Optional field, \"true\" when the event has been saved in a simplified HTML format, \"false\" otherwise.",
				"self": ["Optional field with details particular to the authorized user, only present if requested and user is a member of the hosting group", {
					"checked_in": "Boolean indicator of the current member's check-in status",
					"watching": "For events without waitlist you may check your watchlist status with this property. Values may either be true of false.",
					"rsvp": ["Member's RSVP, if any", {
						"response": "\"yes\", \"no\", or \"waitlist\"",
						"answers": "Array of answers to event survey questions",
						"guests": "number of guests"
					}],
					"role": "The authenticated member's role in within the group, if any. This may be one of: Organizer, Assistant Organizer, Event Organizer, etc.",
					"rated": "Boolean indicator of whether the current member rated the event or not",
					"actions": "list of actions the current user may perform, potentially: \"announce\" to announce the event to the group's members, \"attendance\" to view or take attendance for the event, \"payments\" to mark members as paid if the event is a paid event, \"publish\" to publish a draft event, \"edit\" to edit the event information, \"edit_hosts\" to edit the hosts for the event, \"delete\" to delete the event, \"rsvp\" to RSVP yes or no to the event, or \"wait\" to get on the waiting list (using the same RSVP methods). For events without a waitlist, you may see either \"watch\" or \"unwatch\" to watch for opening spots for the event when the event is full. If an organizer requires membership dues to rsvp and the authorized member has not paid theirs, \"dues\" will be included",
					"pay_status": "The authenticated member's payment status. This may be one of 'none', 'paid', 'partially_paid', 'payment_pending', 'echeck_pending', 'refund_pending', 'partially_refunded', 'refunded'."
				}],
				"featured": "Optional fields parameter which returns \"true\" if the event is featured and \"false\" otherwise",
				"rsvpable": "Indicates if the currently authenticated member can RSVP or not, only returned if requested in the fields parameter",
				"publish_status": "\"published\" or \"draft\" only visible to organizers",
				"email_reminders": "Optional fields parameter limited to organizers and event hosts, if false, event reminders are disabled",
				"rsvp_rules": ["Conditions set by the organizer, only returned if requested in the fields parameter.", {
					"open_time": "UTC time that members may begin to RSVP",
					"close_time": "UTC time that RSVPs will no longer be accepted, though organizers may close RSVPs earlier",
					"waitlisting": "Wait list handling when RSVP limit is reached. Value may be one of \"auto\", \"manual\" or \"off\"",
					"guest_limit": "Number of guests members may include in their RSVP, 0 or more",
					"closed": "Flag indicating that RSVPing is closed for the event. 1 is true 0 is false",
					"refund_policy": ["The organizer-defined terms for refunds. If this is defined, you must provide the authenticated member a way to access this information before they can RSVP. They will need to agree to these terms before they RSVP", {
						"days": "if member_cancellation is present, it's relative to this many days before the event",
						"notes": "additional refund policy notes",
						"policies": " list of one or more of the following. 'no_refunds' if the organizer will not issue refunds', 'member_cancellation' if the organizer offers a refund for member cancellation, 'event_cancellation' if the organizer offers a refund if the event is canceled, 'event_rescheduled' if the organizer offers a refund when the event is rescheduled"
					}]
				}],
				"id": "The event id. May be numeric or alphanumeric, always served as a string",
				"distance": "Distance in miles from the search location, if one was specified",
				"timezone": "Returned when \"timezone\" is provided in fields parameter. This represents the universal timezone identifier for the host group",
				"time": "UTC start time of the event, in milliseconds since the epoch",
				"venue_visibility": "Set to \"members\" or \"public\". The \"venue\" element will not be present if the visibility is \"members\" and the current authenticated user is not a member of the group hosting the event. This value is only returned if requested in the fields parameter",
				"updated": "UTC last modified time of the event, in milliseconds since the epoch",
				"yes_rsvp_count": "Number of yes RSVPs including guests",
				"created": "UTC creation time of the event, in milliseconds since the epoch",
				"description": "Description of the event",
				"survey_questions": ["Optional \"fields\" response property for event with surveys", {
					"id": "Question identifier",
					"question": "Question text",
					"required": "Flag indicating if a response to this question is required to RSVP. Currently always false."
				}],
				"name": "The name of the event",
				"headcount": "The number of members in attendance according to the attendance taker. This may be 0 if attendance has not yet been taken",
				"photo_album_id": "optional fields parameter which returns the ID of the photo album for this event, if one exists",
				"rsvp_alerts": "Optional fields parameter limited to organizers and event hosts, if false, member RSVP alerts are disabled",
				"photo_count": "Optional field, number of photos posted to the event",
				"comment_count": "Optional field, number of comments posted to the event",
				"rsvp_limit": "The number of \"yes\" RSVPs an event can have before members will be added to the waiting list",
				"trending_rank": "Indicates the trending rank within the current result set. The best rank is zero, increasing rank values are less \"trending\". This value is only returned if requested in the fields parameter",
				"status": "\"cancelled\", \"upcoming\", \"past\", \"proposed\", \"suggested\" or \"draft\"",
				"maybe_rsvp_count": "Number of maybe RSVPs including guests",
				"photo_url": "URL of the event photo, if one exists",
				"venue": ["Venue, if selected and not hidden", {
					"id": "Venue id",
					"zip": "ZIP code if, venue is in US or Canada",
					"phone": "Phone number of venue",
					"address_3": "Line 3 of venue address",
					"repinned": "true if the editor of the event altered the original venues pin location, false otherwise",
					"city, state, country": "City, Country and if in US state of venue",
					"lat, lon": "Geographic coordinates of venue",
					"name": "Venue name",
					"address_1": "Line 1 of venue address",
					"address_2": "Line 2 of venue address"
				}],
				"short_link": "Optional field. If hosting group is private, this will return the group's short_link",
				"event_hosts": ["List of members hosting the event, only returned if requested in the fields parameter.", {
					"member_name": "The host's member name",
					"member_id": "The host's member id"
				}],
				"fee": ["Fee info returned when payment is defined", {
					"amount": "Amount of the fee",
					"description": "Fee description, typically \"per person\"",
					"label": "Fee label, typically \"Price\"",
					"required": "\"1\" if payment is required to RSVP, \"0\" otherwise",
					"accepts": "Accepted method of payment. Can be one of \"paypal\", \"amazon\", or \"cash\"",
					"currency": "Currency accepted for fee"
				}],
				"utc_offset": "The local offset from UTC time, in milliseconds",
				"duration": "Event duration in milliseconds, if an end time is specified by the organizer. When not present, a default of 3 hours may be assumed by applications.",
				"announced": "Organizers and hosts can see if the event was announced",
				"event_url": "URL of the event's page on meetup.com",
				"how_to_find_us": "The information provided by the event host for \"How will members find you there?\". Visible when location is visible to the authenticated member",
				"rating": ["Only past events have this field, an aggregate of anonymous ratings", {
					"count": "Number of ratings been collected",
					"average": "Average of collected ratings"
				}],
				"group": ["Group that is hosting the event", {
					"id": "Group id",
					"category": ["Optional field. Category of this group", {
						"id": "Numeric identifier of the category",
						"name": "Display name of the category",
						"shortname": "String identifier of the category"
					}],
					"topics": ["Optional field. Topics related to this group", {
						"id": "Topic ID",
						"urlkey": "Unique keyword used to identify this topic",
						"name": "Topic name"
					}],
					"group_photo": ["Optional field, photo for the group hosting the event", {
						"photo_link": "URL for a standard size of the photo",
						"highres_link": "URL for the photo at its maximum size",
						"thumb_link": "URL for a thumbnail of the photo",
						"photo_id": "-"
					}],
					"group_lat": "Approximate group latitude",
					"name": "Group name",
					"group_lon": "Approximate group longitude",
					"join_mode": "\"open\", \"approval\", or \"closed\"",
					"membership_dues": ["Optional field returned when fields parameter is set to group_membership_dues", {
						"methods": "Array of acceptable payment methods. May be one or more of \"amazon_payments\", \"paypal\", \"credit_card\" or \"other\"",
						"fee": "Numeric fee value",
						"trial_days": "When present, returns the number of days the group is offering a free trial period for to new members. When not present, this indicates that the group does not offer a trial membership period",
						"required": "\"2\" if dues are required to join, \"1\" if dues are required to RSVP, \"0\" otherwise",
						"fee_desc": "Description of fee",
						"refund_policy": "Array of payment refund policies. May be one or more of \"none\", \"member_leaves\", \"group_closes\", \"member_banned\", or \"custom\"",
						"currency": "Currency fee is declared as"
					}],
					"urlname": "Group URL name",
					"who": "What the group calls its members"
				}],
				"simple_html_description": "Optional field, description of the event in simple HTML format.",
				"why": "We should do this because..."
			}],
			"ongoing_event": ["The meetup event the current member has RSVP'd to that's currently happening", {
				"visibility": "Event visibility: \"public\", \"members\" or \"public_limited\". Events in private groups that do not expose limited information are visible only to that group's members and should not be made public.",
				"is_simplehtml": "Optional field, \"true\" when the event has been saved in a simplified HTML format, \"false\" otherwise.",
				"self": ["Optional field with details particular to the authorized user, only present if requested and user is a member of the hosting group", {
					"checked_in": "Boolean indicator of the current member's check-in status",
					"watching": "For events without waitlist you may check your watchlist status with this property. Values may either be true of false.",
					"rsvp": ["Member's RSVP, if any", {
						"response": "\"yes\", \"no\", or \"waitlist\"",
						"answers": "Array of answers to event survey questions",
						"guests": "number of guests"
					}],
					"role": "The authenticated member's role in within the group, if any. This may be one of: Organizer, Assistant Organizer, Event Organizer, etc.",
					"rated": "Boolean indicator of whether the current member rated the event or not",
					"actions": "list of actions the current user may perform, potentially: \"announce\" to announce the event to the group's members, \"attendance\" to view or take attendance for the event, \"payments\" to mark members as paid if the event is a paid event, \"publish\" to publish a draft event, \"edit\" to edit the event information, \"edit_hosts\" to edit the hosts for the event, \"delete\" to delete the event, \"rsvp\" to RSVP yes or no to the event, or \"wait\" to get on the waiting list (using the same RSVP methods). For events without a waitlist, you may see either \"watch\" or \"unwatch\" to watch for opening spots for the event when the event is full. If an organizer requires membership dues to rsvp and the authorized member has not paid theirs, \"dues\" will be included",
					"pay_status": "The authenticated member's payment status. This may be one of 'none', 'paid', 'partially_paid', 'payment_pending', 'echeck_pending', 'refund_pending', 'partially_refunded', 'refunded'."
				}],
				"featured": "Optional fields parameter which returns \"true\" if the event is featured and \"false\" otherwise",
				"rsvpable": "Indicates if the currently authenticated member can RSVP or not, only returned if requested in the fields parameter",
				"publish_status": "\"published\" or \"draft\" only visible to organizers",
				"email_reminders": "Optional fields parameter limited to organizers and event hosts, if false, event reminders are disabled",
				"rsvp_rules": ["Conditions set by the organizer, only returned if requested in the fields parameter.", {
					"open_time": "UTC time that members may begin to RSVP",
					"close_time": "UTC time that RSVPs will no longer be accepted, though organizers may close RSVPs earlier",
					"waitlisting": "Wait list handling when RSVP limit is reached. Value may be one of \"auto\", \"manual\" or \"off\"",
					"guest_limit": "Number of guests members may include in their RSVP, 0 or more",
					"closed": "Flag indicating that RSVPing is closed for the event. 1 is true 0 is false",
					"refund_policy": ["The organizer-defined terms for refunds. If this is defined, you must provide the authenticated member a way to access this information before they can RSVP. They will need to agree to these terms before they RSVP", {
						"days": "if member_cancellation is present, it's relative to this many days before the event",
						"notes": "additional refund policy notes",
						"policies": " list of one or more of the following. 'no_refunds' if the organizer will not issue refunds', 'member_cancellation' if the organizer offers a refund for member cancellation, 'event_cancellation' if the organizer offers a refund if the event is canceled, 'event_rescheduled' if the organizer offers a refund when the event is rescheduled"
					}]
				}],
				"id": "The event id. May be numeric or alphanumeric, always served as a string",
				"distance": "Distance in miles from the search location, if one was specified",
				"timezone": "Returned when \"timezone\" is provided in fields parameter. This represents the universal timezone identifier for the host group",
				"time": "UTC start time of the event, in milliseconds since the epoch",
				"venue_visibility": "Set to \"members\" or \"public\". The \"venue\" element will not be present if the visibility is \"members\" and the current authenticated user is not a member of the group hosting the event. This value is only returned if requested in the fields parameter",
				"updated": "UTC last modified time of the event, in milliseconds since the epoch",
				"yes_rsvp_count": "Number of yes RSVPs including guests",
				"created": "UTC creation time of the event, in milliseconds since the epoch",
				"description": "Description of the event",
				"survey_questions": ["Optional \"fields\" response property for event with surveys", {
					"id": "Question identifier",
					"question": "Question text",
					"required": "Flag indicating if a response to this question is required to RSVP. Currently always false."
				}],
				"name": "The name of the event",
				"headcount": "The number of members in attendance according to the attendance taker. This may be 0 if attendance has not yet been taken",
				"photo_album_id": "optional fields parameter which returns the ID of the photo album for this event, if one exists",
				"rsvp_alerts": "Optional fields parameter limited to organizers and event hosts, if false, member RSVP alerts are disabled",
				"photo_count": "Optional field, number of photos posted to the event",
				"comment_count": "Optional field, number of comments posted to the event",
				"rsvp_limit": "The number of \"yes\" RSVPs an event can have before members will be added to the waiting list",
				"trending_rank": "Indicates the trending rank within the current result set. The best rank is zero, increasing rank values are less \"trending\". This value is only returned if requested in the fields parameter",
				"status": "\"cancelled\", \"upcoming\", \"past\", \"proposed\", \"suggested\" or \"draft\"",
				"maybe_rsvp_count": "Number of maybe RSVPs including guests",
				"photo_url": "URL of the event photo, if one exists",
				"venue": ["Venue, if selected and not hidden", {
					"id": "Venue id",
					"zip": "ZIP code if, venue is in US or Canada",
					"phone": "Phone number of venue",
					"address_3": "Line 3 of venue address",
					"repinned": "true if the editor of the event altered the original venues pin location, false otherwise",
					"city, state, country": "City, Country and if in US state of venue",
					"lat, lon": "Geographic coordinates of venue",
					"name": "Venue name",
					"address_1": "Line 1 of venue address",
					"address_2": "Line 2 of venue address"
				}],
				"short_link": "Optional field. If hosting group is private, this will return the group's short_link",
				"event_hosts": ["List of members hosting the event, only returned if requested in the fields parameter.", {
					"member_name": "The host's member name",
					"member_id": "The host's member id"
				}],
				"fee": ["Fee info returned when payment is defined", {
					"amount": "Amount of the fee",
					"description": "Fee description, typically \"per person\"",
					"label": "Fee label, typically \"Price\"",
					"required": "\"1\" if payment is required to RSVP, \"0\" otherwise",
					"accepts": "Accepted method of payment. Can be one of \"paypal\", \"amazon\", or \"cash\"",
					"currency": "Currency accepted for fee"
				}],
				"utc_offset": "The local offset from UTC time, in milliseconds",
				"duration": "Event duration in milliseconds, if an end time is specified by the organizer. When not present, a default of 3 hours may be assumed by applications.",
				"announced": "Organizers and hosts can see if the event was announced",
				"event_url": "URL of the event's page on meetup.com",
				"how_to_find_us": "The information provided by the event host for \"How will members find you there?\". Visible when location is visible to the authenticated member",
				"rating": ["Only past events have this field, an aggregate of anonymous ratings", {
					"count": "Number of ratings been collected",
					"average": "Average of collected ratings"
				}],
				"group": ["Group that is hosting the event", {
					"id": "Group id",
					"category": ["Optional field. Category of this group", {
						"id": "Numeric identifier of the category",
						"name": "Display name of the category",
						"shortname": "String identifier of the category"
					}],
					"topics": ["Optional field. Topics related to this group", {
						"id": "Topic ID",
						"urlkey": "Unique keyword used to identify this topic",
						"name": "Topic name"
					}],
					"group_photo": ["Optional field, photo for the group hosting the event", {
						"photo_link": "URL for a standard size of the photo",
						"highres_link": "URL for the photo at its maximum size",
						"thumb_link": "URL for a thumbnail of the photo",
						"photo_id": "-"
					}],
					"group_lat": "Approximate group latitude",
					"name": "Group name",
					"group_lon": "Approximate group longitude",
					"join_mode": "\"open\", \"approval\", or \"closed\"",
					"membership_dues": ["Optional field returned when fields parameter is set to group_membership_dues", {
						"methods": "Array of acceptable payment methods. May be one or more of \"amazon_payments\", \"paypal\", \"credit_card\" or \"other\"",
						"fee": "Numeric fee value",
						"trial_days": "When present, returns the number of days the group is offering a free trial period for to new members. When not present, this indicates that the group does not offer a trial membership period",
						"required": "\"2\" if dues are required to join, \"1\" if dues are required to RSVP, \"0\" otherwise",
						"fee_desc": "Description of fee",
						"refund_policy": "Array of payment refund policies. May be one or more of \"none\", \"member_leaves\", \"group_closes\", \"member_banned\", or \"custom\"",
						"currency": "Currency fee is declared as"
					}],
					"urlname": "Group URL name",
					"who": "What the group calls its members"
				}],
				"simple_html_description": "Optional field, description of the event in simple HTML format.",
				"why": "We should do this because..."
			}]
		},
		"http_method": "GET",
		"scopes": ["basic"],
		"name": "Dashboard",
		"path": "\/dashboard",
		"group": "dashboard",
		"examples": ""
	}, {
		"desc": "Returns a list of Meetup topic categories",
		"param_notes": "No parameters required parameters",
		"params": {
			"lat,lon,radius": "Use a given lat\/lon\/radius (miles) to search best_topics for instead of using the member's lat\/lon.  When present, all three are required.",
			"fields": "Parameter for requesting optional response properties"
		},
		"api_version": "2",
		"formats": ["json", "xml"],
		"http_method": "GET",
		"response": {
			"topic": ["A topic linked to the category", {
				"id": "Topic ID",
				"urlkey": "The unique keyword used to identify this topic",
				"name": "The name of the topic"
			}],
			"best_topics": ["Optional fields parameter representing the best topic matches for the category", {
				"id": "Topic ID",
				"urlkey": "The unique keyword used to identify this topic",
				"name": "The name of the topic"
			}],
			"name": "Display name of the category",
			"shortname": "String identifier of the category",
			"photo": ["A photo representing the category", {
				"photo_link": "URL for a standard size of the photo",
				"highres_link": "URL for the photo at its maximum size",
				"thumb_link": "URL for the thumbnail sized photo",
				"photo_id": "-"
			}],
			"category_ids": "list of category ids associated with this topic category"
		},
		"scopes": ["basic"],
		"name": "Topic Categories",
		"path": "\/2\/topic_categories",
		"orders": {
			"shortname": "(default order) ascending"
		},
		"examples": "",
		"group": "topics"
	}, {
		"desc": "API method for accessing meetup topics",
		"param_notes": "At least one of the required parameter(s) must be supplied with the request.",
		"params": {
			"topic": "Return members that RSVP'd to events with these ID numbers [separated by commas]",
			"search": "Return topics related to a list of search terms [separate search keywords with +'s]",
			"name": "Return topics that match the specified name (e.g. 'Digital Photography', 'Classical Music')",
			"member_id": "Return topics a target member is subscribed to"
		},
		"formats": ["json", "rss", "atom", "xml"],
		"response": {
			"id": "The ID of the topic",
			"description": "A description of the topic",
			"link": "A URL of the topic's page on meetup.com updated The last date and time that this topic's information changed",
			"urlkey": "The unique keyword used to identify this topic",
			"name": "The name of the topic",
			"members": "The number of members who belong to groups under this topic"
		},
		"http_method": "GET",
		"scopes": ["basic"],
		"name": "Topics",
		"path": "\/topics",
		"orders": {
			"topic": "the topic key",
			"alertees": "total alertees in the topic",
			"name": "the topic name",
			"members": "total members in the topic"
		},
		"group": "topics",
		"examples": "\nGet a list of topics related to \"Dogs\"\n\n    https:\/\/api.meetup.com\/topics.xml\/?name=dog&key=ABDE12456AB2324445\n\nGet a list of topics with the search keywords \"movies\" or \"sports\" in the description\n\n    https:\/\/api.meetup.com\/topics.xml\/?search=movies+sports&key=ABDE12456AB2324445\n    "
	}, {
		"desc": "Deprecated API method for accessing meetup events. Please see [\/2\/events](\/meetup_api\/docs\/2\/events\/) and [\/2\/open_events](\/meetup_api\/docs\/2\/open_events\/) for replacements.",
		"param_notes": "At least one of the required parameters must be supplied with the request. Location-based queries are deprecated. Use the \/2\/open_events API for location-based queries instead.",
		"params": {
			"rsvp_limit": "The number of \"yes\" rsvps an event can have before members will be added to the waiting list",
			"*topic, groupnum": "Return events for the group with given topic and number",
			"status": "Return events matching one of the given status values, separated by commas. Possible statuses are \"upcoming\", \"autoscheduled\", \"proposed\", \"suggested\", and \"past\". The default status parameter is \"upcoming\". If a date of today or earlier is specified for after, the default becomes \"past,upcoming\". Specifying a status of \"autoscheduled\" by itself, or in addition to others, will display events which have been created using the autoscheduling tool.",
			"before": "Return events that started before the specified date, formatted as described by the \"after\" parameter. Defaults to after + 60 days. Limited to one year beyond the after date",
			"*group_id": "Return events from groups with the specified IDs, separated by commas",
			"*group_urlname": "Return events for the group with this custom URL path",
			"after": "Return events that start after the specified date, formatted as either a relative date such as \"-1w\" for one week ago or by absolute time in milliseconds since the epoch. Relative dates are annotated using one of the following time intervals: \"d\" for day, \"w\" for week, or \"m\" for month. Defaults to today. See also status",
			"*member_id": "A member id number, limits results set to events in groups that the member specified by this id is currently a member of (excludes private groups, unless the member_id is the same as that of the member making the request)",
			"text_format": "Format of the description text, \"html\", \"plain\", or \"simplehtml\". Defaults to \"html\"",
			"*topic": "Return events in the specified topic(s), one topic allowed",
			"*id": "Return events with the specified IDs, separated by commas. When id is supplied, the date and status parameters are by default unlimited so that all events with matching IDs will be returned",
			"fields": "Request that additional fields (separated by commas) be included in the output. \"photo_album_id\" will include photo album info, and \"waiting_rsvpcount\" will include waitlist rsvp info in response items"
		},
		"formats": ["json", "rss", "atom", "xml", "kml"],
		"http_method": "GET",
		"response": {
			"rsvpcount": "Number of \"yes\" or \"maybe\" rsvps to this event, including guests.",
			"venue_name": "name of venue",
			"maybe_rsvpcount": "Number of \"maybe\" rsvps to this event, including guests",
			"my_waitlist_status": "The current waitlist status for this event of the user making the request (could be \"waitlist\" or blank)",
			"organizer_id": "Member ID of the organizer of this Meetup group",
			"venue_lat, venue_lon": "the latitude and longitude of the venue",
			"allow_maybe_rsvp": "Set to \"1\" if this meetup allows members to rsvp \"Maybe\", or",
			"feelabel": "Fee label, or blank if this event has no fee or fee label",
			"member_status": "Set to \"member\" or \"nonmember\" if member is member of the group hosting the event",
			"myrsvp": "The current RSVP status for this event of the user making the request (could be \"yes\",\"no\",\"maybe\", or \"none\")",
			"id": "The ID of the event",
			"time": "The date and time that the event will take place",
			"venue_zip": "zipcode of venue",
			"venue_visibility": "Set to \"members\" or \"public\". All other venue fields will be blank if the visibility is \"members\" and the current authenticated user is not a member of the group hosting the event.",
			"feedesc": "Fee description, or blank if this event has no fee",
			"ismeetup": "Set to either a \"1\" or a \"0\" if this is a Meetup event or just a calendar note, respectively",
			"venue_address1": "line 1 of venue address",
			"updated": "The last date and time that the event's information was modified",
			"venue_address2": "line 2 of venue address",
			"description": "Description of the event, see text_format above",
			"venue_city": "city of venue",
			"name": "The name (title) of the event",
			"lat, lon": "Latitude and longitude coordinates of group location",
			"venue_id": "ID of venue",
			"photo_album_id": "ID of photo album attached to this event, only supplied if fields contains \"photo_album_id\"",
			"photo_count": "Number of photos in an album associated with this event, only supplied if fields contains \"photo_album_id\"",
			"venue_state": "state of venue",
			"no_rsvpcount": "Number of \"no\" rsvps to this event",
			"status": "Description of the event, see text_format above",
			"photo_url": "URL of the event photo",
			"guest_limit": "Maximum number of guests that a member can RSVP for",
			"utc_time": "The date and time that the event will take place, in milliseconds since the epoch.",
			"waiting_rsvpcount": "Number of waitlist rsvps to this event, including guests, only supplied if fields contains \"waiting_rsvpcount\"",
			"utc_rsvp_cutoff": "The date and time that members can RSVP until, in milliseconds since the epoch",
			"organizer_name": "Name of the organizer of this Meetup group",
			"short_link": "Optional field. If hosting group is private, this will return the group's short_link",
			"utc_rsvp_open_time": "The date and time that members can begin to RSVP, in milliseconds since the epoch",
			"feecurrency": "Currency of the fee for this event",
			"event_hosts": ["Members chosen to host this event, may include the organizer", {
				"member_name": "Name of the event host",
				"member_id": "Member ID of the event host"
			}],
			"attendee_count": "Number of attendees at the event",
			"venue_phone": "phone number of venue",
			"fee": "Fee for this event (or 0.0 if this event has no fee)",
			"venue_map": "URL of a map indicating the venue location",
			"rating_count": "The number of ratings that have been submitted for the event. If the event hasn't happened yet or there are no ratings submitted, this field will default to 0",
			"how_to_find_us": "The information provided by the event host for \"How will members find you there?\". Visible when location is visible to the authenticated member",
			"rating": "The event's rating. If the event hasn't happened yet or there are no ratings submitted, this field will default to 0"
		},
		"scopes": ["basic"],
		"name": "Events",
		"path": "\/events",
		"orders": {
			"topic": "the topic of the event",
			"time": "event time",
			"updated": "event updated field",
			"location": "group location, country, state [if present], city",
			"group": "the name of the group having the event"
		},
		"examples": "",
		"group": "deprecated",
		"prefer": "\/2\/events"
	}, {
		"desc": "Searches for recent and upcoming public events hosted by Meetup groups. Its search window  is the past one month through the next three months, and is subject to change. Open Events is optimized to search for current events by location, category, topic, or text, and only lists Meetups that have **3 or more RSVPs**. The number or results returned with each request is not guaranteed to be the same as the page size due to secondary filtering. If you're looking for a particular event or events within a particular group, use the standard [Events](\/meetup_api\/docs\/2\/events\/) method.",
		"param_notes": "At least one of the required parameter(s) must be supplied with the request.\n\nFor geo-based requests, you may provide a location in one of three ways. By `lat` and `lon`, by `zip`, or by `country`, `city`, and optionally a `state`, if the provided country has states.\n\nSome groups, while remaining private, still wish to show some information about their events. You can include these events in results using the `limited_events` request parameter.",
		"params": {
			"*state": "If searching in a country with states, a valid 2 character state code",
			"status": "Status may be \"upcoming\", \"past\" or both separated by a comma. The default is \"upcoming\" only",
			"*lon": "A valid longitude, limits the returned group events to those within radius miles",
			"*city": "A valid city",
			"*lat": "A valid latitude, limits the returned group events to those within radius miles",
			"*country": "A valid country code",
			"*text": "Events that contain the given term or terms somewhere in their content. The terms are OR'd by default. Separate terms with \" AND \" for events that have combined terms. To have terms automatically AND'd, set the \"and_text\" to true",
			"text_format": "Format of the description text, \"html\" or \"plain\". Defaults to \"html\"",
			"time": "Return events scheduled within the given time range, defined by two times separated with a single comma. Each end of the range may be specified with relative dates, such as \"1m\" for one month from now, or by absolute time in milliseconds since the epoch. If an endpoint is omitted, the range is unbounded on that end. The default value is unbounded on both ends (though restricted to the search window described above). Note: to retrieve past events you must also update status value",
			"*topic": "Return events in the specified topic or topics specified by commas. This is the topic \"urlkey\" returned by the Topics method. If all supplied topics are unknown, a 400 error response is returned with the code \"badtopic\".",
			"*category": "Return events in the specified category or categories specified by commas. This is the category id returned by the Categories method.",
			"*zip": "A valid US zip code, limits the returned groups to those within radius miles",
			"radius": "Radius, in miles for geographic requests, default 25.0 -- maximum 100. May also be specified as \"smart\", a dynamic radius based on the number of active groups in the area",
			"and_text": "Changes the interpretation of the \"text\" field from OR'd terms to AND'd terms",
			"limited_events": "Include limited event information for private groups that wish to expose only a small amount of information about their events. This includes just: id, name, utc_offset, time, duration, yes_rsvp_count, waitlist_count, group, visibility. Value must be true or false.",
			"fields": "Request that additional fields (separated by commas) be included in the output"
		},
		"api_version": "2",
		"formats": ["json", "xml"],
		"http_method": "GET",
		"response": {
			"visibility": "Event visibility: \"public\", \"members\" or \"public_limited\". Events in private groups that do not expose limited information are visible only to that group's members and should not be made public.",
			"is_simplehtml": "Optional field, \"true\" when the event has been saved in a simplified HTML format, \"false\" otherwise.",
			"self": ["Optional field with details particular to the authorized user, only present if requested and user is a member of the hosting group", {
				"checked_in": "Boolean indicator of the current member's check-in status",
				"watching": "For events without waitlist you may check your watchlist status with this property. Values may either be true of false.",
				"rsvp": ["Member's RSVP, if any", {
					"response": "\"yes\", \"no\", or \"waitlist\"",
					"answers": "Array of answers to event survey questions",
					"guests": "number of guests"
				}],
				"role": "The authenticated member's role in within the group, if any. This may be one of: Organizer, Assistant Organizer, Event Organizer, etc.",
				"rated": "Boolean indicator of whether the current member rated the event or not",
				"actions": "list of actions the current user may perform, potentially: \"announce\" to announce the event to the group's members, \"attendance\" to view or take attendance for the event, \"payments\" to mark members as paid if the event is a paid event, \"publish\" to publish a draft event, \"edit\" to edit the event information, \"edit_hosts\" to edit the hosts for the event, \"delete\" to delete the event, \"rsvp\" to RSVP yes or no to the event, or \"wait\" to get on the waiting list (using the same RSVP methods). For events without a waitlist, you may see either \"watch\" or \"unwatch\" to watch for opening spots for the event when the event is full. If an organizer requires membership dues to rsvp and the authorized member has not paid theirs, \"dues\" will be included",
				"pay_status": "The authenticated member's payment status. This may be one of 'none', 'paid', 'partially_paid', 'payment_pending', 'echeck_pending', 'refund_pending', 'partially_refunded', 'refunded'."
			}],
			"featured": "Optional fields parameter which returns \"true\" if the event is featured and \"false\" otherwise",
			"rsvpable": "Indicates if the currently authenticated member can RSVP or not, only returned if requested in the fields parameter",
			"publish_status": "\"published\" or \"draft\" only visible to organizers",
			"email_reminders": "Optional fields parameter limited to organizers and event hosts, if false, event reminders are disabled",
			"rsvp_rules": ["Conditions set by the organizer, only returned if requested in the fields parameter.", {
				"open_time": "UTC time that members may begin to RSVP",
				"close_time": "UTC time that RSVPs will no longer be accepted, though organizers may close RSVPs earlier",
				"waitlisting": "Wait list handling when RSVP limit is reached. Value may be one of \"auto\", \"manual\" or \"off\"",
				"guest_limit": "Number of guests members may include in their RSVP, 0 or more",
				"closed": "Flag indicating that RSVPing is closed for the event. 1 is true 0 is false",
				"refund_policy": ["The organizer-defined terms for refunds. If this is defined, you must provide the authenticated member a way to access this information before they can RSVP. They will need to agree to these terms before they RSVP", {
					"days": "if member_cancellation is present, it's relative to this many days before the event",
					"notes": "additional refund policy notes",
					"policies": " list of one or more of the following. 'no_refunds' if the organizer will not issue refunds', 'member_cancellation' if the organizer offers a refund for member cancellation, 'event_cancellation' if the organizer offers a refund if the event is canceled, 'event_rescheduled' if the organizer offers a refund when the event is rescheduled"
				}]
			}],
			"id": "The event id. May be numeric or alphanumeric, always served as a string",
			"distance": "Distance in miles from the search location, if one was specified",
			"timezone": "Returned when \"timezone\" is provided in fields parameter. This represents the universal timezone identifier for the host group",
			"time": "UTC start time of the event, in milliseconds since the epoch",
			"venue_visibility": "Set to \"members\" or \"public\". The \"venue\" element will not be present if the visibility is \"members\" and the current authenticated user is not a member of the group hosting the event. This value is only returned if requested in the fields parameter",
			"updated": "UTC last modified time of the event, in milliseconds since the epoch",
			"created": "UTC creation time of the event, in milliseconds since the epoch",
			"yes_rsvp_count": "Number of yes RSVPs including guests",
			"description": "Description of the event",
			"survey_questions": ["Optional \"fields\" response property for event with surveys", {
				"id": "Question identifier",
				"question": "Question text",
				"required": "Flag indicating if a response to this question is required to RSVP. Currently always false."
			}],
			"name": "The name of the event",
			"headcount": "The number of members in attendance according to the attendance taker. This may be 0 if attendance has not yet been taken",
			"photo_album_id": "optional fields parameter which returns the ID of the photo album for this event, if one exists",
			"rsvp_alerts": "Optional fields parameter limited to organizers and event hosts, if false, member RSVP alerts are disabled",
			"photo_count": "Optional field, number of photos posted to the event",
			"comment_count": "Optional field, number of comments posted to the event",
			"rsvp_limit": "The number of \"yes\" RSVPs an event can have before members will be added to the waiting list",
			"trending_rank": "Indicates the trending rank within the current result set. The best rank is zero, increasing rank values are less \"trending\". This value is only returned if requested in the fields parameter",
			"status": "\"cancelled\", \"upcoming\", \"past\", \"proposed\", \"suggested\" or \"draft\"",
			"maybe_rsvp_count": "Number of maybe RSVPs including guests",
			"photo_url": "URL of the event photo, if one exists",
			"venue": ["Venue, if selected and not hidden", {
				"id": "Venue id",
				"zip": "ZIP code if, venue is in US or Canada",
				"phone": "Phone number of venue",
				"address_3": "Line 3 of venue address",
				"repinned": "true if the editor of the event altered the original venues pin location, false otherwise",
				"city, state, country": "City, Country and if in US state of venue",
				"lat, lon": "Geographic coordinates of venue",
				"name": "Venue name",
				"address_1": "Line 1 of venue address",
				"address_2": "Line 2 of venue address"
			}],
			"short_link": "Optional field. If hosting group is private, this will return the group's short_link",
			"event_hosts": ["List of members hosting the event, only returned if requested in the fields parameter.", {
				"member_name": "The host's member name",
				"member_id": "The host's member id"
			}],
			"fee": ["Fee info returned when payment is defined", {
				"amount": "Amount of the fee",
				"description": "Fee description, typically \"per person\"",
				"label": "Fee label, typically \"Price\"",
				"required": "\"1\" if payment is required to RSVP, \"0\" otherwise",
				"accepts": "Accepted method of payment. Can be one of \"paypal\", \"amazon\", or \"cash\"",
				"currency": "Currency accepted for fee"
			}],
			"utc_offset": "The local offset from UTC time, in milliseconds",
			"duration": "Event duration in milliseconds, if an end time is specified by the organizer. When not present, a default of 3 hours may be assumed by applications.",
			"announced": "Organizers and hosts can see if the event was announced",
			"event_url": "URL of the event's page on meetup.com",
			"how_to_find_us": "The information provided by the event host for \"How will members find you there?\". Visible when location is visible to the authenticated member",
			"rating": ["Only past events have this field, an aggregate of anonymous ratings", {
				"count": "Number of ratings been collected",
				"average": "Average of collected ratings"
			}],
			"group": ["Group that is hosting the event", {
				"id": "Group id",
				"category": ["Optional field. Category of this group", {
					"id": "Numeric identifier of the category",
					"name": "Display name of the category",
					"shortname": "String identifier of the category"
				}],
				"topics": ["Optional field. Topics related to this group", {
					"id": "Topic ID",
					"urlkey": "Unique keyword used to identify this topic",
					"name": "Topic name"
				}],
				"group_photo": ["Optional field, photo for the group hosting the event", {
					"photo_link": "URL for a standard size of the photo",
					"highres_link": "URL for the photo at its maximum size",
					"thumb_link": "URL for a thumbnail of the photo",
					"photo_id": "-"
				}],
				"group_lat": "Approximate group latitude",
				"name": "Group name",
				"group_lon": "Approximate group longitude",
				"join_mode": "\"open\", \"approval\", or \"closed\"",
				"membership_dues": ["Optional field returned when fields parameter is set to group_membership_dues", {
					"methods": "Array of acceptable payment methods. May be one or more of \"amazon_payments\", \"paypal\", \"credit_card\" or \"other\"",
					"fee": "Numeric fee value",
					"trial_days": "When present, returns the number of days the group is offering a free trial period for to new members. When not present, this indicates that the group does not offer a trial membership period",
					"required": "\"2\" if dues are required to join, \"1\" if dues are required to RSVP, \"0\" otherwise",
					"fee_desc": "Description of fee",
					"refund_policy": "Array of payment refund policies. May be one or more of \"none\", \"member_leaves\", \"group_closes\", \"member_banned\", or \"custom\"",
					"currency": "Currency fee is declared as"
				}],
				"urlname": "Group URL name",
				"who": "What the group calls its members"
			}],
			"simple_html_description": "Optional field, description of the event in simple HTML format.",
			"why": "We should do this because..."
		},
		"scopes": ["basic"],
		"name": "OpenEvents",
		"path": "\/2\/open_events",
		"orders": {
			"trending": "you will likely want to specify \"desc=true\" to get the best trending results first.",
			"distance": "ordering is approximate and will not exactly match the values in the \"distance\" field.",
			"time": "(default order) ascending"
		},
		"examples": "\nPhotography Meetups happening within the next week. The time range is unbounded on the left but status defaults to \"upcoming\":\n\n    https:\/\/api.meetup.com\/2\/open_events.xml?topic=photo&time=,1w&key=ABDE12456AB2324445\n\nMeetups around New York within the past week. The time range is unbounded on the right:\n\n    https:\/\/api.meetup.com\/2\/open_events.xml?zip=10012&time=-1w,&amp;status=past&key=ABDE12456AB2324445\n\nMeetups mentioning racquetball in the past or next week:\n\n    https:\/\/api.meetup.com\/2\/open_events.xml?text=racquetball&time=-1w,1w&status=past,upcoming&key=ABDE12456AB2324445\n",
		"group": "events"
	}, {
		"desc": "Recommends upcoming meetups for the authorized member.",
		"param_notes": "For geo-based requests, you may provide a location in one of three ways. By `lat` and `lon`, by `zip`, or by `country`, `city`, and optionally a `state`, if the provided country has states.\n\nIf the server is unable to produce recommendations in a suitable amount of time, a 503 error will be returned. If no parameters are specified, Meetups are recommended for the upcoming week in the member's default location.\n\nPagination works a little differently in this method than in others. Rather than using \"offset\" and \"page\" request parameters, this method uses an opaque \"page_token\" request parameter to determine the page of results returned. If there are more results, the \"next\" property of the [meta section](\/meetup_api\/docs\/#meta) of the response will contain the next page's page_token. The number of results returned is not deterministic but a best-effort attempt will be made to return at least some.\n",
		"params": {
			"zip": "A valid US zip code, limits the returned groups to those within radius miles",
			"lon": "A valid longitude, limits the returned group events to those within radius miles",
			"page_token": "An opaque string used to page through results. This can be found appended to the 'next' link in the meta section of the response.",
			"state": "If searching in a country with states, a valid 2 character state code",
			"category_id": "Comma delimited list of category ids to limit recommendations to",
			"country": "A valid country code",
			"city": "A valid city",
			"time": "Return events scheduled within the given time range, defined by two times separated with a single comma. Each end of the range may be specified with relative dates, such as \"1m\" for one month from now, or by absolute time in milliseconds since the epoch. If an endpoint is omitted, the range is unbounded on that end. The default value is unbounded on both ends (though restricted to the search window described above). Note: to retrieve past events you must also update status value",
			"text_format": "Format of the description text, \"html\", \"plain\", or \"simplehtml\". Defaults to \"html\"",
			"self_groups": "set to \"include\" or \"exclude\" meetups the authorized member belongs to; default is \"include\"",
			"radius": "Radius, in miles for geographic requests, defaults to the member's preferred radius or 0.5 -- maximum 100. May also be specified as \"smart\", a dynamic radius based on the number of active groups in the area",
			"topic_id": "Comma delimited list of topics to help inform recommendation",
			"lat": "A valid latitude, limits the returned group events to those within radius miles",
			"fields": "Request that additional fields (separated by commas) be included in the output"
		},
		"api_version": "2",
		"formats": ["json", "xml"],
		"http_method": "GET",
		"response": {
			"visibility": "Event visibility: \"public\", \"members\" or \"public_limited\". Events in private groups that do not expose limited information are visible only to that group's members and should not be made public.",
			"is_simplehtml": "Optional field, \"true\" when the event has been saved in a simplified HTML format, \"false\" otherwise.",
			"self": ["Optional field with details particular to the authorized user, only present if requested and user is a member of the hosting group", {
				"checked_in": "Boolean indicator of the current member's check-in status",
				"watching": "For events without waitlist you may check your watchlist status with this property. Values may either be true of false.",
				"rsvp": ["Member's RSVP, if any", {
					"response": "\"yes\", \"no\", or \"waitlist\"",
					"answers": "Array of answers to event survey questions",
					"guests": "number of guests"
				}],
				"role": "The authenticated member's role in within the group, if any. This may be one of: Organizer, Assistant Organizer, Event Organizer, etc.",
				"rated": "Boolean indicator of whether the current member rated the event or not",
				"actions": "list of actions the current user may perform, potentially: \"announce\" to announce the event to the group's members, \"attendance\" to view or take attendance for the event, \"payments\" to mark members as paid if the event is a paid event, \"publish\" to publish a draft event, \"edit\" to edit the event information, \"edit_hosts\" to edit the hosts for the event, \"delete\" to delete the event, \"rsvp\" to RSVP yes or no to the event, or \"wait\" to get on the waiting list (using the same RSVP methods). For events without a waitlist, you may see either \"watch\" or \"unwatch\" to watch for opening spots for the event when the event is full. If an organizer requires membership dues to rsvp and the authorized member has not paid theirs, \"dues\" will be included",
				"pay_status": "The authenticated member's payment status. This may be one of 'none', 'paid', 'partially_paid', 'payment_pending', 'echeck_pending', 'refund_pending', 'partially_refunded', 'refunded'."
			}],
			"featured": "Optional fields parameter which returns \"true\" if the event is featured and \"false\" otherwise",
			"rsvpable": "Indicates if the currently authenticated member can RSVP or not, only returned if requested in the fields parameter",
			"publish_status": "\"published\" or \"draft\" only visible to organizers",
			"email_reminders": "Optional fields parameter limited to organizers and event hosts, if false, event reminders are disabled",
			"rsvp_rules": ["Conditions set by the organizer, only returned if requested in the fields parameter.", {
				"open_time": "UTC time that members may begin to RSVP",
				"close_time": "UTC time that RSVPs will no longer be accepted, though organizers may close RSVPs earlier",
				"waitlisting": "Wait list handling when RSVP limit is reached. Value may be one of \"auto\", \"manual\" or \"off\"",
				"guest_limit": "Number of guests members may include in their RSVP, 0 or more",
				"closed": "Flag indicating that RSVPing is closed for the event. 1 is true 0 is false",
				"refund_policy": ["The organizer-defined terms for refunds. If this is defined, you must provide the authenticated member a way to access this information before they can RSVP. They will need to agree to these terms before they RSVP", {
					"days": "if member_cancellation is present, it's relative to this many days before the event",
					"notes": "additional refund policy notes",
					"policies": " list of one or more of the following. 'no_refunds' if the organizer will not issue refunds', 'member_cancellation' if the organizer offers a refund for member cancellation, 'event_cancellation' if the organizer offers a refund if the event is canceled, 'event_rescheduled' if the organizer offers a refund when the event is rescheduled"
				}]
			}],
			"id": "The event id. May be numeric or alphanumeric, always served as a string",
			"distance": "Distance in miles from the search location, if one was specified",
			"timezone": "Returned when \"timezone\" is provided in fields parameter. This represents the universal timezone identifier for the host group",
			"time": "UTC start time of the event, in milliseconds since the epoch",
			"venue_visibility": "Set to \"members\" or \"public\". The \"venue\" element will not be present if the visibility is \"members\" and the current authenticated user is not a member of the group hosting the event. This value is only returned if requested in the fields parameter",
			"updated": "UTC last modified time of the event, in milliseconds since the epoch",
			"created": "UTC creation time of the event, in milliseconds since the epoch",
			"yes_rsvp_count": "Number of yes RSVPs including guests",
			"description": "Description of the event",
			"survey_questions": ["Optional \"fields\" response property for event with surveys", {
				"id": "Question identifier",
				"question": "Question text",
				"required": "Flag indicating if a response to this question is required to RSVP. Currently always false."
			}],
			"name": "The name of the event",
			"headcount": "The number of members in attendance according to the attendance taker. This may be 0 if attendance has not yet been taken",
			"photo_album_id": "optional fields parameter which returns the ID of the photo album for this event, if one exists",
			"rsvp_alerts": "Optional fields parameter limited to organizers and event hosts, if false, member RSVP alerts are disabled",
			"photo_count": "Optional field, number of photos posted to the event",
			"comment_count": "Optional field, number of comments posted to the event",
			"rsvp_limit": "The number of \"yes\" RSVPs an event can have before members will be added to the waiting list",
			"trending_rank": "Indicates the trending rank within the current result set. The best rank is zero, increasing rank values are less \"trending\". This value is only returned if requested in the fields parameter",
			"status": "\"cancelled\", \"upcoming\", \"past\", \"proposed\", \"suggested\" or \"draft\"",
			"maybe_rsvp_count": "Number of maybe RSVPs including guests",
			"photo_url": "URL of the event photo, if one exists",
			"venue": ["Venue, if selected and not hidden", {
				"id": "Venue id",
				"zip": "ZIP code if, venue is in US or Canada",
				"phone": "Phone number of venue",
				"address_3": "Line 3 of venue address",
				"repinned": "true if the editor of the event altered the original venues pin location, false otherwise",
				"city, state, country": "City, Country and if in US state of venue",
				"lat, lon": "Geographic coordinates of venue",
				"name": "Venue name",
				"address_1": "Line 1 of venue address",
				"address_2": "Line 2 of venue address"
			}],
			"short_link": "Optional field. If hosting group is private, this will return the group's short_link",
			"event_hosts": ["List of members hosting the event, only returned if requested in the fields parameter.", {
				"member_name": "The host's member name",
				"member_id": "The host's member id"
			}],
			"fee": ["Fee info returned when payment is defined", {
				"amount": "Amount of the fee",
				"description": "Fee description, typically \"per person\"",
				"label": "Fee label, typically \"Price\"",
				"required": "\"1\" if payment is required to RSVP, \"0\" otherwise",
				"accepts": "Accepted method of payment. Can be one of \"paypal\", \"amazon\", or \"cash\"",
				"currency": "Currency accepted for fee"
			}],
			"utc_offset": "The local offset from UTC time, in milliseconds",
			"duration": "Event duration in milliseconds, if an end time is specified by the organizer. When not present, a default of 3 hours may be assumed by applications.",
			"announced": "Organizers and hosts can see if the event was announced",
			"event_url": "URL of the event's page on meetup.com",
			"how_to_find_us": "The information provided by the event host for \"How will members find you there?\". Visible when location is visible to the authenticated member",
			"rating": ["Only past events have this field, an aggregate of anonymous ratings", {
				"count": "Number of ratings been collected",
				"average": "Average of collected ratings"
			}],
			"group": ["Group that is hosting the event", {
				"id": "Group id",
				"category": ["Optional field. Category of this group", {
					"id": "Numeric identifier of the category",
					"name": "Display name of the category",
					"shortname": "String identifier of the category"
				}],
				"topics": ["Optional field. Topics related to this group", {
					"id": "Topic ID",
					"urlkey": "Unique keyword used to identify this topic",
					"name": "Topic name"
				}],
				"group_photo": ["Optional field, photo for the group hosting the event", {
					"photo_link": "URL for a standard size of the photo",
					"highres_link": "URL for the photo at its maximum size",
					"thumb_link": "URL for a thumbnail of the photo",
					"photo_id": "-"
				}],
				"group_lat": "Approximate group latitude",
				"name": "Group name",
				"group_lon": "Approximate group longitude",
				"join_mode": "\"open\", \"approval\", or \"closed\"",
				"membership_dues": ["Optional field returned when fields parameter is set to group_membership_dues", {
					"methods": "Array of acceptable payment methods. May be one or more of \"amazon_payments\", \"paypal\", \"credit_card\" or \"other\"",
					"fee": "Numeric fee value",
					"trial_days": "When present, returns the number of days the group is offering a free trial period for to new members. When not present, this indicates that the group does not offer a trial membership period",
					"required": "\"2\" if dues are required to join, \"1\" if dues are required to RSVP, \"0\" otherwise",
					"fee_desc": "Description of fee",
					"refund_policy": "Array of payment refund policies. May be one or more of \"none\", \"member_leaves\", \"group_closes\", \"member_banned\", or \"custom\"",
					"currency": "Currency fee is declared as"
				}],
				"urlname": "Group URL name",
				"who": "What the group calls its members"
			}],
			"simple_html_description": "Optional field, description of the event in simple HTML format.",
			"why": "We should do this because..."
		},
		"scopes": ["basic"],
		"name": "Concierge",
		"path": "\/2\/concierge",
		"orders": {
			"time": "ascending time is the default and only ordering"
		},
		"examples": "\nWith only authorization parameters supplied, concierge recommends\nupcoming Meetup events in the member's default location.\n\n    curl http:\/\/api.meetup.com\/2\/concierge?key=API_KEY_HERE\n",
		"group": "events"
	}, {
		"desc": "Fetch information about Meetup Groups.",
		"param_notes": "At least one of the required parameter(s) must be supplied with the request. Answers to questions are expected to follow the naming convention: answer_{question_id}=myanswer when joining with the [Profile Create](\/meetup_api\/docs\/2\/profile) method.",
		"params": {
			"*topic, groupnum": "Return the group with this topic and number",
			"*group_id": "one or more separated by commas",
			"*domain": "one or more custom group domains, separated by commas",
			"*group_urlname": "one or more separated by commas, includes no slashes",
			"*country, city, state": "A valid country code, city and for the US, State. limits the returned groups to those within radius miles",
			"*member_id": "one or more separated by commas, for groups this member belongs to",
			"*topic": "Only return groups in the specified topic [one topic allowed]",
			"*lat,lon": "A valid latitude and longitude, limits the returned groups to those within radius miles",
			"*zip": "A valid US zip code, limits the returned groups to those within radius miles.",
			"*category_id": "Only return groups in the specified category. [one category allowed]",
			"radius": "Radius, in miles for geographic requests, default 25 -- maximum 100",
			"*organizer_id": "one or more organizer IDs, separated by commas",
			"fields": "optional result fields, separated by commas."
		},
		"api_version": "2",
		"formats": ["json", "xml"],
		"http_method": "GET",
		"response": {
			"visibility": "\"public\", \"public_limited\", or \"members\" only",
			"is_simplehtml": "Optional field, \"true\" when the group description has been saved in a simplified HTML format, \"false\" otherwise.",
			"link": "URL of group home",
			"state": "State of the group, if in US or Canada",
			"next_event": ["Optional fields parameter. the next upcoming event, if the group has one", {
				"id": "Alphanumeric event ID",
				"utc_offset": "The local offset from UTC time, in milliseconds",
				"time": "UTC start time of the event, in milliseconds since the epoch",
				"name": "Name of event"
			}],
			"self": ["Optional field, contains details specific to the authorized user if an active member of this group", {
				"visited": "Member's last visit to the group site, in milliseconds since the epoch",
				"status": "Optional fields property returned when 'self_status' is provided. Indicates the authorized user's membership with this group. Value may be one of pending_payment, blocked, active, pending or none",
				"role": "Member's role in group, if any: Organizer, Assistant Organizer, Event Organizer, etc.",
				"actions": "list of actions the current user may perform, potentially \"event_create\": the ability to create new events, \"event_draft\": the ability to save new events as drafts, \"role_assign\": the ability to assign member roles, or \"edit\": the ability to edit group settings"
			}],
			"similar_groups": ["List of similar groups, adjusted for the authorized member", {
				"photos": "Optional field, a small set of photos from the group. See documentation for \"photos\" above.",
				"id": "Group id",
				"group_lat": "Approximate group latitude",
				"name": "Group name",
				"group_lon": "Approximate group longitude",
				"join_mode": "\"open\", \"approval\", or \"closed\"",
				"urlname": "Group URL name",
				"who": "What the group calls its members"
			}],
			"join_mode": "\"open\", \"closed\", or \"approval\"",
			"membership_dues": ["Optional fields parameter. Returns the Group's membership dues info", {
				"methods": "Array of acceptable payment methods. May be one or more of \"amazon_payments\", \"paypal\", \"credit_card\" or \"other\"",
				"fee": "Numeric fee value",
				"trial_days": "When present, returns the number of days the group is offering a free trial period for to new members. When not present, this indicates that the group does not offer a trial membership period",
				"required": "\"2\" if dues are required to join, \"1\" if dues are required to RSVP, \"0\" otherwise",
				"fee_desc": "Description of fee",
				"refund_policy": "Array of payment refund policies. May be one or more of \"none\", \"member_leaves\", \"group_closes\", \"member_banned\", or \"custom\"",
				"currency": "Currency fee is declared as"
			}],
			"who": "what the group calls its members",
			"city": "City of the group",
			"id": "Group ID",
			"timezone": "This represents the universal timezone identifier for the group",
			"list_addr": "Optional field returning list address prefix. List mail will be {list_addr}-list@meetup.com. Announce email will be {list_addr}-announce@meetup.com. You must be a member of the group to see this",
			"created": "Date and time that the group was founded, in milliseconds since the epoch",
			"description": "Group description",
			"primary_topic": "The groups primary topic",
			"name": "Group name",
			"ga_code": "Optional field return the google analytics code for the group. Only members that can edit group settings can see this",
			"urlname": "Unique group name as it appears in the URL, no slashes",
			"other_services": ["Optional fields parameter for linked services", {
				"[service-name]": ["This element is flickr, tumblr, twitter, or linkedin", {
					"identifier": "identifier for the service, a username or URL"
				}]
			}],
			"lat": "Latitude",
			"members": "Current number of members in the group",
			"list_mode": "Defines policy for who can post to the group mailing list. May be one of 'open' meaning any Member can post, 'off' meaning no one can post, 'moderated' meaning messages must be approved, or 'orgs_only' meaning only organizers may post to the list",
			"pending_members": "Optional fields parameter, visible only to the organizers, that represents the number of pending members for groups that require membership approval",
			"lon": "Longitude",
			"join_info": ["Optional field, lists any questions requested when joining and required fields", {
				"photo_req": "\"1\" if required, \"0\" otherwise",
				"questions": ["List of questions asked by organizer", {
					"id": "Unique identifier for the questions.",
					"question": "The text of the question"
				}],
				"questions_req": "\"1\" if required, \"0\" otherwise",
				"intro_req": "\"1\" if required, \"0\" otherwise"
			}],
			"organizer": ["Group's primary organizer", {
				"member_state": "Optional field",
				"member_city": "Optional field",
				"name": "Name of the member",
				"member_country": "Optional field",
				"member_id": "Member's ID"
			}],
			"short_link": "Optional field, a shorted URL for the group",
			"country": "Country of the group",
			"photos": ["Optional field, a small set of photos from the group", {
				"photo_link": "URL for a standard size of the photo",
				"highres_link": "URL for the photo at its maximum size",
				"thumb_link": "URL for the thumbnail sized photo",
				"photo_id": "-"
			}],
			"category": ["Category associated with this group", {
				"id": "Numeric identifier of the category",
				"name": "Display name of the category",
				"shortname": "String identifier of the category"
			}],
			"topics": ["Topics related to this group", {
				"id": "Topic ID",
				"urlkey": "Unique keyword used to identify this topic",
				"name": "Topic name"
			}],
			"welcome_message": "Optional fields parameter. Returns the Group's default welcome message if the authenticated member is the organizer of the group",
			"group_photo": ["Main photo associated with the group", {
				"photo_link": "URL for a standard size of the photo",
				"highres_link": "URL for the photo at its maximum size",
				"thumb_link": "URL for the thumbnail sized photo",
				"photo_id": "-"
			}],
			"sponsors": ["Optional field, sponsors of this group", {
				"details": "Longer information about the sponsorship, may include HTML",
				"image_url": "Image representing the sponsorship",
				"redeem": "If the sponsorship is a perk and the authorized user belongs to the group, instructions for redeeming the perk",
				"name": "Name of the sponsor",
				"perk_url": "If the sponsorship is a perk, a link to the sponsor's available perks",
				"url": "Link to sponsor's site",
				"info": "Short description of the sponsorship"
			}],
			"rating": "0 to 5, average of group reviews",
			"simple_html_description": "Description of the group, in simple HTML format. This value is translated to HTML to update the description."
		},
		"scopes": ["basic"],
		"name": "Groups",
		"path": "\/2\/groups",
		"orders": {
			"id": "group creation time [newest first]",
			"location": "group location, country, state [if present], city",
			"name": "the name of the group",
			"members": "number of members [largest first]"
		},
		"examples": "",
		"group": "groups"
	}, {
		"desc": "Access Meetup events using a group, member, or event id. Events in private groups are available only to authenticated members of those groups. To search events by topic or location, see [Open Events](\/meetup_api\/docs\/2\/open_events).",
		"param_notes": "At least one of the required parameter(s) must be supplied with the request. Some groups, while remaining private, still wish to show some information about their events. You can include these events in results using the `limited_events` request parameter.",
		"params": {
			"status": "Status may be \"upcoming\", \"past\", \"proposed\", \"suggested\", \"cancelled\", \"draft\" or multiple separated by a comma. The default is \"upcoming\", which includes Meetups that are happening now according to their **duration**. Meetups that are \"proposed\" or \"suggested\" do not have a date assigned; the former are listed on the site as <i>official<\/i> while the latter appear as <i>in the making<\/i>. Drafts are only visible to organizers of groups hosting the events.",
			"*rsvp": "Filters events by the currently authenticated member's RSVP status. May be a comma delimited list of \"yes\", \"no\", \"waitlist\", \"maybe\" or \"none\"",
			"*group_id": "Multiple ids may be separated with commas",
			"*event_id": "Multiple ids may be separated with commas",
			"*group_urlname": "Path to group from meetup.com, no slashes",
			"*venue_id": "Multiple ids may be separated with commas",
			"*member_id": "Single member id, to find events in this member's groups",
			"text_format": "Format of the description text, \"html\" or \"plain\". Defaults to \"html\"",
			"time": "Return events scheduled within the given time range, defined by two times separated with a single comma. Each end of the range may be specified with relative dates, such as \"1m\" for one month from now, or by absolute time in milliseconds since the epoch. If an endpoint is omitted, the range is unbounded on that end. The default value is unbounded on both ends (though restricted to the search window described above). Note: to retrieve past events you must also update status value",
			"*group_domain": "Group custom domain",
			"limited_events": "Include limited event information for private groups that wish to expose only a small amount of information about their events. This includes just: id, name, utc_offset, time, duration, yes_rsvp_count, waitlist_count, group, visibility. Value must be true or false.",
			"fields": "Request that additional fields (separated by commas) be included in the output"
		},
		"api_version": "2",
		"formats": ["json", "xml"],
		"http_method": "GET",
		"response": {
			"visibility": "Event visibility: \"public\", \"members\" or \"public_limited\". Events in private groups that do not expose limited information are visible only to that group's members and should not be made public.",
			"is_simplehtml": "Optional field, \"true\" when the event has been saved in a simplified HTML format, \"false\" otherwise.",
			"self": ["Optional field with details particular to the authorized user, only present if requested and user is a member of the hosting group", {
				"checked_in": "Boolean indicator of the current member's check-in status",
				"watching": "For events without waitlist you may check your watchlist status with this property. Values may either be true of false.",
				"rsvp": ["Member's RSVP, if any", {
					"response": "\"yes\", \"no\", or \"waitlist\"",
					"answers": "Array of answers to event survey questions",
					"guests": "number of guests"
				}],
				"role": "The authenticated member's role in within the group, if any. This may be one of: Organizer, Assistant Organizer, Event Organizer, etc.",
				"rated": "Boolean indicator of whether the current member rated the event or not",
				"actions": "list of actions the current user may perform, potentially: \"announce\" to announce the event to the group's members, \"attendance\" to view or take attendance for the event, \"payments\" to mark members as paid if the event is a paid event, \"publish\" to publish a draft event, \"edit\" to edit the event information, \"edit_hosts\" to edit the hosts for the event, \"delete\" to delete the event, \"rsvp\" to RSVP yes or no to the event, or \"wait\" to get on the waiting list (using the same RSVP methods). For events without a waitlist, you may see either \"watch\" or \"unwatch\" to watch for opening spots for the event when the event is full. If an organizer requires membership dues to rsvp and the authorized member has not paid theirs, \"dues\" will be included",
				"pay_status": "The authenticated member's payment status. This may be one of 'none', 'paid', 'partially_paid', 'payment_pending', 'echeck_pending', 'refund_pending', 'partially_refunded', 'refunded'."
			}],
			"featured": "Optional fields parameter which returns \"true\" if the event is featured and \"false\" otherwise",
			"rsvpable": "Indicates if the currently authenticated member can RSVP or not, only returned if requested in the fields parameter",
			"publish_status": "\"published\" or \"draft\" only visible to organizers",
			"email_reminders": "Optional fields parameter limited to organizers and event hosts, if false, event reminders are disabled",
			"rsvp_rules": ["Conditions set by the organizer, only returned if requested in the fields parameter.", {
				"open_time": "UTC time that members may begin to RSVP",
				"close_time": "UTC time that RSVPs will no longer be accepted, though organizers may close RSVPs earlier",
				"waitlisting": "Wait list handling when RSVP limit is reached. Value may be one of \"auto\", \"manual\" or \"off\"",
				"guest_limit": "Number of guests members may include in their RSVP, 0 or more",
				"closed": "Flag indicating that RSVPing is closed for the event. 1 is true 0 is false",
				"refund_policy": ["The organizer-defined terms for refunds. If this is defined, you must provide the authenticated member a way to access this information before they can RSVP. They will need to agree to these terms before they RSVP", {
					"days": "if member_cancellation is present, it's relative to this many days before the event",
					"notes": "additional refund policy notes",
					"policies": " list of one or more of the following. 'no_refunds' if the organizer will not issue refunds', 'member_cancellation' if the organizer offers a refund for member cancellation, 'event_cancellation' if the organizer offers a refund if the event is canceled, 'event_rescheduled' if the organizer offers a refund when the event is rescheduled"
				}]
			}],
			"id": "The event id. May be numeric or alphanumeric, always served as a string",
			"distance": "Distance in miles from the search location, if one was specified",
			"timezone": "Returned when \"timezone\" is provided in fields parameter. This represents the universal timezone identifier for the host group",
			"time": "UTC start time of the event, in milliseconds since the epoch",
			"venue_visibility": "Set to \"members\" or \"public\". The \"venue\" element will not be present if the visibility is \"members\" and the current authenticated user is not a member of the group hosting the event. This value is only returned if requested in the fields parameter",
			"updated": "UTC last modified time of the event, in milliseconds since the epoch",
			"yes_rsvp_count": "Number of yes RSVPs including guests",
			"created": "UTC creation time of the event, in milliseconds since the epoch",
			"description": "Description of the event",
			"survey_questions": ["Optional \"fields\" response property for event with surveys", {
				"id": "Question identifier",
				"question": "Question text",
				"required": "Flag indicating if a response to this question is required to RSVP. Currently always false."
			}],
			"name": "The name of the event",
			"headcount": "The number of members in attendance according to the attendance taker. This may be 0 if attendance has not yet been taken",
			"photo_album_id": "optional fields parameter which returns the ID of the photo album for this event, if one exists",
			"rsvp_alerts": "Optional fields parameter limited to organizers and event hosts, if false, member RSVP alerts are disabled",
			"photo_count": "Optional field, number of photos posted to the event",
			"comment_count": "Optional field, number of comments posted to the event",
			"rsvp_limit": "The number of \"yes\" RSVPs an event can have before members will be added to the waiting list",
			"trending_rank": "Indicates the trending rank within the current result set. The best rank is zero, increasing rank values are less \"trending\". This value is only returned if requested in the fields parameter",
			"status": "\"cancelled\", \"upcoming\", \"past\", \"proposed\", \"suggested\" or \"draft\"",
			"maybe_rsvp_count": "Number of maybe RSVPs including guests",
			"photo_url": "URL of the event photo, if one exists",
			"venue": ["Venue, if selected and not hidden", {
				"id": "Venue id",
				"zip": "ZIP code if, venue is in US or Canada",
				"phone": "Phone number of venue",
				"address_3": "Line 3 of venue address",
				"repinned": "true if the editor of the event altered the original venues pin location, false otherwise",
				"city, state, country": "City, Country and if in US state of venue",
				"lat, lon": "Geographic coordinates of venue",
				"name": "Venue name",
				"address_1": "Line 1 of venue address",
				"address_2": "Line 2 of venue address"
			}],
			"short_link": "Optional field. If hosting group is private, this will return the group's short_link",
			"event_hosts": ["List of members hosting the event, only returned if requested in the fields parameter.", {
				"member_name": "The host's member name",
				"member_id": "The host's member id"
			}],
			"fee": ["Fee info returned when payment is defined", {
				"amount": "Amount of the fee",
				"description": "Fee description, typically \"per person\"",
				"label": "Fee label, typically \"Price\"",
				"required": "\"1\" if payment is required to RSVP, \"0\" otherwise",
				"accepts": "Accepted method of payment. Can be one of \"paypal\", \"amazon\", or \"cash\"",
				"currency": "Currency accepted for fee"
			}],
			"utc_offset": "The local offset from UTC time, in milliseconds",
			"duration": "Event duration in milliseconds, if an end time is specified by the organizer. When not present, a default of 3 hours may be assumed by applications.",
			"announced": "Organizers and hosts can see if the event was announced",
			"event_url": "URL of the event's page on meetup.com",
			"how_to_find_us": "The information provided by the event host for \"How will members find you there?\". Visible when location is visible to the authenticated member",
			"rating": ["Only past events have this field, an aggregate of anonymous ratings", {
				"count": "Number of ratings been collected",
				"average": "Average of collected ratings"
			}],
			"group": ["Group that is hosting the event", {
				"id": "Group id",
				"category": ["Optional field. Category of this group", {
					"id": "Numeric identifier of the category",
					"name": "Display name of the category",
					"shortname": "String identifier of the category"
				}],
				"topics": ["Optional field. Topics related to this group", {
					"id": "Topic ID",
					"urlkey": "Unique keyword used to identify this topic",
					"name": "Topic name"
				}],
				"group_photo": ["Optional field, photo for the group hosting the event", {
					"photo_link": "URL for a standard size of the photo",
					"highres_link": "URL for the photo at its maximum size",
					"thumb_link": "URL for a thumbnail of the photo",
					"photo_id": "-"
				}],
				"group_lat": "Approximate group latitude",
				"name": "Group name",
				"group_lon": "Approximate group longitude",
				"join_mode": "\"open\", \"approval\", or \"closed\"",
				"membership_dues": ["Optional field returned when fields parameter is set to group_membership_dues", {
					"methods": "Array of acceptable payment methods. May be one or more of \"amazon_payments\", \"paypal\", \"credit_card\" or \"other\"",
					"fee": "Numeric fee value",
					"trial_days": "When present, returns the number of days the group is offering a free trial period for to new members. When not present, this indicates that the group does not offer a trial membership period",
					"required": "\"2\" if dues are required to join, \"1\" if dues are required to RSVP, \"0\" otherwise",
					"fee_desc": "Description of fee",
					"refund_policy": "Array of payment refund policies. May be one or more of \"none\", \"member_leaves\", \"group_closes\", \"member_banned\", or \"custom\"",
					"currency": "Currency fee is declared as"
				}],
				"urlname": "Group URL name",
				"who": "What the group calls its members"
			}],
			"simple_html_description": "Optional field, description of the event in simple HTML format.",
			"why": "We should do this because..."
		},
		"scopes": ["basic"],
		"name": "Events",
		"path": "\/2\/events",
		"orders": {
			"time": "(default order) ascending"
		},
		"examples": "\nUpcoming and current events in ny-tech: [Console &rarr;](\/meetup_api\/console\/?path=\/2\/events&group_urlname=ny-tech)\n\nUpcoming and current events in ny-tech including my status: [Console &rarr;](\/meetup_api\/console\/?path=\/2\/events&group_urlname=ny-tech&fields=self)\n    ",
		"group": "events"
	}, {
		"desc": "",
		"param_notes": "All required parameters must be supplied. This method requires an HTTP POST.\n\nSurvey questions may be submitted in the format \"question_{index}=questiontext\" where \"index\" is an integer representing the order the questions should be presented in. e.g. question_0=question1&question_1=question2.\n\nOrganizers of the hosting group may optionally save this event as a draft by setting \"publish_status\" to \"draft\". Drafts are then queryable using the [\/2\/events](\/meetup_api\/docs\/2\/events) API setting the \"status\" request parameter to \"draft\"",
		"tag": "create",
		"params": {
			"rsvp_limit": "Total number of RSVPs available for the event",
			"rsvp_close": "Users with permission may set the RSVP close time for the event. The time may be specified in milliseconds since the epoch, or relative to the current time in the d\/w\/m format.",
			"guest_limit": "Number of guests members may include in their RSVP, 0 or more",
			"*name": "Name of the event",
			"rsvp_open": "Users with permission may set the RSVP open time for the event. The time may be specified in milliseconds since the epoch, or relative to the current time in the d\/w\/m format.",
			"*group_id": "Group hosting the event",
			"question_{index}": "Those with permission may include up to 6 survey questions for the event. See the parameter notes section for more information",
			"publish_status": "If you are an organizer of the group, you may set this to \"draft\" to save the event as a draft. Doing so will require a status=draft filter on \/2\/event queries.",
			"*group_urlname": "URL name of the Group hosting the event",
			"email_reminders": "Limited to organizers and event hosts, if false, disables event reminders",
			"duration": "Event duration in milliseconds. When not specified, a default of 3 hours may be assumed by applications. To clear event duration, set this to 0",
			"time": "Event start time in milliseconds since the epoch, or relative to the current time in the d\/w\/m format.",
			"venue_visibility": "Controls the visibility of the event venue for non members of the hosting group. May be one of \"public\" or \"members\"",
			"waitlisting": "Waiting list status may be one of: auto, manual, off",
			"description": "Longer description of the event, in HTML.",
			"how_to_find_us": "The information provided by the event host for \"How will members find you there?\". Visible when location is visible to the authenticated member",
			"hosts": "Up to 5 comma-separated valid member ids to be hosts for the event. If hosts is not provided, the authorized member is the default host",
			"venue_id": "Numeric identifier of a venue",
			"host_instructions": "optional set of instructions to provide to hosts, only used when hosts are provided",
			"rsvp_alerts": "Limited to organizers and event hosts, if false, disables member RSVP alerts",
			"simple_html_description": "Description of the event, in simple HTML format. This value is translated to HTML to update the description.",
			"why": "We should do this because..."
		},
		"api_version": "2",
		"doc_path": "\/2\/event",
		"formats": ["json", "xml"],
		"http_method": "POST",
		"scopes": ["basic"],
		"name": "Event Create",
		"path": "\/2\/event",
		"response_notes": "If successful, this method returns an HTTP 201 Created response with a Location header containing the Event Get method for this event. 401 Unauthorized is returned if the currently authenticated member can not create meetups in the specified group. The content body is the same as that returned by [Event Get](#get).",
		"examples": "",
		"group": "events"
	}, {
		"desc": "Update an existing Meetup",
		"param_notes": "All parameters are optional. This method requires an HTTP POST.\n\nIf a lat & lon are provided, the event's venue will be updated accordingly.\n\nSurvey questions may be submitted in the format \"question_{index}=questiontext\" where \"index\" is an integer representing the order the questions should be presented in. e.g. question_0=question1&question_1=question2.\n\nTo view existing survey questions supply the request parameter fields=survey_questions with the [Event Get](#get) To edit questions you may submit questions in the format \"question_edit_{id}=updatedquestion\" where id is the id of the question. To clear an existing question for the event survey, just submit question_edit_{id} with an empty value.\n\nOrganizers may publish a draft event by posting with the \"publish_status\" request parameter set to \"published\". Organizers and hosts of the event may also optionally announce an unannounced event by posting with the \"announce\" request parameter set to \"true\"",
		"tag": "edit",
		"params": {
			"rsvp_close": "Users with permission may set the RSVP close time for the event. The time may be specified in milliseconds since the epoch, or relative to the current time in the d\/w\/m format. To unset rsvp_close, set this to 0",
			"announce": "Organizers and hosts may set this to true to announce a Meetup.",
			"announce_message": "Organizers and hosts may provide an optional message in this field when announcing a Meetup",
			"publish_status": "If you are an organizer of the group, you may set this to \"draft\" or \"published\". Setting state to \"draft\" will require a status=draft filter on \/2\/event queries.",
			"email_reminders": "Limited to organizers and event hosts, if false, disables event reminders",
			"time": "event start time in milliseconds since the epoch, or relative to the current time in the d\/w\/m format.",
			"venue_visibility": "Controls the visibility of venue. May be one of \"public\" or \"members\"",
			"description": "Longer description of the event, in HTML.",
			"name": "Event name",
			"hosts": "Up to 5 valid member ids to be hosts for the event.",
			"venue_id": "Numeric identifier of a venue. To unset the event's venue, set this to 0",
			"rsvp_alerts": "Limited to organizers and event hosts, if false, disables member RSVP alerts",
			"rsvp_limit": "Total number of RSVPs available for the event. To remove this limit, set this to 0",
			"question_edit_{id}": "Those with permission may include up to 6 survey questions, including new questions. To delete a question submit this parameter with an empty value",
			"lat,lon": "Updates to the venue's latitude and longitude. When present, both must be provided",
			"guest_limit": "number of guests members may include in their RSVP, 0 or more",
			"group_id": "Group to hold the event",
			"rsvp_open": "Users with permission may set the RSVP open time for the event. The time may be specified in milliseconds since the epoch, or relative to the current time in the d\/w\/m format.",
			"question_{index}": "Those with permission may include up to 6 survey questions, including edited questions, for the event. See the parameter notes section for more information",
			"waitlisting": "Waiting list status may be one of: auto, manual, off",
			"how_to_find_us": "The information provided by the event host for \"How will members find you there?\". Visible when location is visible to the authenticated member",
			"host_instructions": "optional set of instructions to provide to hosts, only used when hosts are provided",
			"simple_html_description": "Description of the event, in simple HTML format. This value is translated to HTML to update the description.",
			"why": "We should do this because..."
		},
		"api_version": "2",
		"doc_path": "\/2\/event",
		"formats": ["json", "xml"],
		"http_method": "POST",
		"scopes": ["basic"],
		"name": "Event Edit",
		"path": "\/2\/event\/:id",
		"response_notes": "If successful, this method returns an HTTP 200 OK response. 401 Unauthorized is returned if the currently authenticated member can not edit the specified Meetup. The content body is the same as that returned by [Event Get](#get).",
		"examples": "",
		"group": "events"
	}, {
		"desc": "Retrieve a single meetup",
		"param_notes": "Only authorization parameters are needed. Some groups, while remaining private, still wish to show some information about their events. You can include these events in results using the `limited_events` request parameter.",
		"tag": "get",
		"params": {
			"limited_events": "Include limited event information for private groups that wish to expose only a small amount of information about their events. This includes just: id, name, utc_offset, time, duration, yes_rsvp_count, waitlist_count, group, visibility. Value must be true or false.",
			"fields": "Request that additional fields (separated by commas) be included in the output."
		},
		"api_version": "2",
		"doc_path": "\/2\/event",
		"formats": ["json", "xml"],
		"http_method": "GET",
		"response": {
			"visibility": "Event visibility: \"public\", \"members\" or \"public_limited\". Events in private groups that do not expose limited information are visible only to that group's members and should not be made public.",
			"is_simplehtml": "Optional field, \"true\" when the event has been saved in a simplified HTML format, \"false\" otherwise.",
			"self": ["Optional field with details particular to the authorized user, only present if requested and user is a member of the hosting group", {
				"checked_in": "Boolean indicator of the current member's check-in status",
				"watching": "For events without waitlist you may check your watchlist status with this property. Values may either be true of false.",
				"rsvp": ["Member's RSVP, if any", {
					"response": "\"yes\", \"no\", or \"waitlist\"",
					"answers": "Array of answers to event survey questions",
					"guests": "number of guests"
				}],
				"role": "The authenticated member's role in within the group, if any. This may be one of: Organizer, Assistant Organizer, Event Organizer, etc.",
				"rated": "Boolean indicator of whether the current member rated the event or not",
				"actions": "list of actions the current user may perform, potentially: \"announce\" to announce the event to the group's members, \"attendance\" to view or take attendance for the event, \"payments\" to mark members as paid if the event is a paid event, \"publish\" to publish a draft event, \"edit\" to edit the event information, \"edit_hosts\" to edit the hosts for the event, \"delete\" to delete the event, \"rsvp\" to RSVP yes or no to the event, or \"wait\" to get on the waiting list (using the same RSVP methods). For events without a waitlist, you may see either \"watch\" or \"unwatch\" to watch for opening spots for the event when the event is full. If an organizer requires membership dues to rsvp and the authorized member has not paid theirs, \"dues\" will be included",
				"pay_status": "The authenticated member's payment status. This may be one of 'none', 'paid', 'partially_paid', 'payment_pending', 'echeck_pending', 'refund_pending', 'partially_refunded', 'refunded'."
			}],
			"featured": "Optional fields parameter which returns \"true\" if the event is featured and \"false\" otherwise",
			"rsvpable": "Indicates if the currently authenticated member can RSVP or not, only returned if requested in the fields parameter",
			"publish_status": "\"published\" or \"draft\" only visible to organizers",
			"email_reminders": "Optional fields parameter limited to organizers and event hosts, if false, event reminders are disabled",
			"rsvp_rules": ["Conditions set by the organizer, only returned if requested in the fields parameter.", {
				"open_time": "UTC time that members may begin to RSVP",
				"close_time": "UTC time that RSVPs will no longer be accepted, though organizers may close RSVPs earlier",
				"waitlisting": "Wait list handling when RSVP limit is reached. Value may be one of \"auto\", \"manual\" or \"off\"",
				"guest_limit": "Number of guests members may include in their RSVP, 0 or more",
				"closed": "Flag indicating that RSVPing is closed for the event. 1 is true 0 is false",
				"refund_policy": ["The organizer-defined terms for refunds. If this is defined, you must provide the authenticated member a way to access this information before they can RSVP. They will need to agree to these terms before they RSVP", {
					"days": "if member_cancellation is present, it's relative to this many days before the event",
					"notes": "additional refund policy notes",
					"policies": " list of one or more of the following. 'no_refunds' if the organizer will not issue refunds', 'member_cancellation' if the organizer offers a refund for member cancellation, 'event_cancellation' if the organizer offers a refund if the event is canceled, 'event_rescheduled' if the organizer offers a refund when the event is rescheduled"
				}]
			}],
			"id": "The event id. May be numeric or alphanumeric, always served as a string",
			"distance": "Distance in miles from the search location, if one was specified",
			"timezone": "Returned when \"timezone\" is provided in fields parameter. This represents the universal timezone identifier for the host group",
			"time": "UTC start time of the event, in milliseconds since the epoch",
			"venue_visibility": "Set to \"members\" or \"public\". The \"venue\" element will not be present if the visibility is \"members\" and the current authenticated user is not a member of the group hosting the event. This value is only returned if requested in the fields parameter",
			"updated": "UTC last modified time of the event, in milliseconds since the epoch",
			"yes_rsvp_count": "Number of yes RSVPs including guests",
			"created": "UTC creation time of the event, in milliseconds since the epoch",
			"description": "Description of the event",
			"survey_questions": ["Optional \"fields\" response property for event with surveys", {
				"id": "Question identifier",
				"question": "Question text",
				"required": "Flag indicating if a response to this question is required to RSVP. Currently always false."
			}],
			"name": "The name of the event",
			"headcount": "The number of members in attendance according to the attendance taker. This may be 0 if attendance has not yet been taken",
			"photo_album_id": "optional fields parameter which returns the ID of the photo album for this event, if one exists",
			"rsvp_alerts": "Optional fields parameter limited to organizers and event hosts, if false, member RSVP alerts are disabled",
			"photo_count": "Optional field, number of photos posted to the event",
			"comment_count": "Optional field, number of comments posted to the event",
			"rsvp_limit": "The number of \"yes\" RSVPs an event can have before members will be added to the waiting list",
			"trending_rank": "Indicates the trending rank within the current result set. The best rank is zero, increasing rank values are less \"trending\". This value is only returned if requested in the fields parameter",
			"status": "\"cancelled\", \"upcoming\", \"past\", \"proposed\", \"suggested\" or \"draft\"",
			"maybe_rsvp_count": "Number of maybe RSVPs including guests",
			"photo_url": "URL of the event photo, if one exists",
			"venue": ["Venue, if selected and not hidden", {
				"id": "Venue id",
				"zip": "ZIP code if, venue is in US or Canada",
				"phone": "Phone number of venue",
				"address_3": "Line 3 of venue address",
				"repinned": "true if the editor of the event altered the original venues pin location, false otherwise",
				"city, state, country": "City, Country and if in US state of venue",
				"lat, lon": "Geographic coordinates of venue",
				"name": "Venue name",
				"address_1": "Line 1 of venue address",
				"address_2": "Line 2 of venue address"
			}],
			"short_link": "Optional field. If hosting group is private, this will return the group's short_link",
			"event_hosts": ["List of members hosting the event, only returned if requested in the fields parameter.", {
				"member_name": "The host's member name",
				"member_id": "The host's member id"
			}],
			"fee": ["Fee info returned when payment is defined", {
				"amount": "Amount of the fee",
				"description": "Fee description, typically \"per person\"",
				"label": "Fee label, typically \"Price\"",
				"required": "\"1\" if payment is required to RSVP, \"0\" otherwise",
				"accepts": "Accepted method of payment. Can be one of \"paypal\", \"amazon\", or \"cash\"",
				"currency": "Currency accepted for fee"
			}],
			"utc_offset": "The local offset from UTC time, in milliseconds",
			"duration": "Event duration in milliseconds, if an end time is specified by the organizer. When not present, a default of 3 hours may be assumed by applications.",
			"announced": "Organizers and hosts can see if the event was announced",
			"event_url": "URL of the event's page on meetup.com",
			"how_to_find_us": "The information provided by the event host for \"How will members find you there?\". Visible when location is visible to the authenticated member",
			"rating": ["Only past events have this field, an aggregate of anonymous ratings", {
				"count": "Number of ratings been collected",
				"average": "Average of collected ratings"
			}],
			"group": ["Group that is hosting the event", {
				"id": "Group id",
				"category": ["Optional field. Category of this group", {
					"id": "Numeric identifier of the category",
					"name": "Display name of the category",
					"shortname": "String identifier of the category"
				}],
				"topics": ["Optional field. Topics related to this group", {
					"id": "Topic ID",
					"urlkey": "Unique keyword used to identify this topic",
					"name": "Topic name"
				}],
				"group_photo": ["Optional field, photo for the group hosting the event", {
					"photo_link": "URL for a standard size of the photo",
					"highres_link": "URL for the photo at its maximum size",
					"thumb_link": "URL for a thumbnail of the photo",
					"photo_id": "-"
				}],
				"group_lat": "Approximate group latitude",
				"name": "Group name",
				"group_lon": "Approximate group longitude",
				"join_mode": "\"open\", \"approval\", or \"closed\"",
				"membership_dues": ["Optional field returned when fields parameter is set to group_membership_dues", {
					"methods": "Array of acceptable payment methods. May be one or more of \"amazon_payments\", \"paypal\", \"credit_card\" or \"other\"",
					"fee": "Numeric fee value",
					"trial_days": "When present, returns the number of days the group is offering a free trial period for to new members. When not present, this indicates that the group does not offer a trial membership period",
					"required": "\"2\" if dues are required to join, \"1\" if dues are required to RSVP, \"0\" otherwise",
					"fee_desc": "Description of fee",
					"refund_policy": "Array of payment refund policies. May be one or more of \"none\", \"member_leaves\", \"group_closes\", \"member_banned\", or \"custom\"",
					"currency": "Currency fee is declared as"
				}],
				"urlname": "Group URL name",
				"who": "What the group calls its members"
			}],
			"simple_html_description": "Optional field, description of the event in simple HTML format.",
			"why": "We should do this because..."
		},
		"scopes": ["basic"],
		"name": "Event Get",
		"path": "\/2\/event\/:id",
		"examples": "",
		"group": "events"
	}, {
		"desc": "Deletes a specified meetup",
		"param_notes": "Only authorization parameters are needed.",
		"tag": "delete",
		"api_version": "2",
		"doc_path": "\/2\/event",
		"formats": ["json", "xml"],
		"http_method": "DELETE",
		"scopes": ["basic"],
		"name": "Event Delete",
		"path": "\/2\/event\/:id",
		"response_notes": "Returns an HTTP 200 response if delete was successful, 401 if unauthorized.",
		"examples": "",
		"group": "events"
	}, {
		"desc": "API method for accessing meetup photos",
		"param_notes": "At least one of the required parameter(s) must be supplied with the request.",
		"params": {
			"*topic": "Return photos in this topic",
			"*topic_id": "Return photos in topics with this ID number",
			"*topic, groupnum": "return photos for the group with given topic and number",
			"*group_id": "Return photos in groups with these ID numbers [separated by commas]",
			"*group_urlname": "return photos for the group with given custom URL path",
			"*album_id": "return photos for the albums with the given id, separated by commas"
		},
		"formats": ["json", "xml"],
		"http_method": "GET",
		"response": {
			"album_id": "Unique identifier of the photo album",
			"member_url": "URL of the public profile of the member who posted the photo",
			"albumtitle": "The name of the photo album that the photo belongs to",
			"captions": "An array containing the captions of the photos in the album",
			"created": "The time and date that the photo was created",
			"link": "URL where the photo can be viewed",
			"descr": "A description of the photo"
		},
		"scopes": ["basic"],
		"name": "Photos",
		"path": "\/photos",
		"orders": {
			"photo_album_id": "the id of the photo, (newer = higher) "
		},
		"examples": "\nReturn public photos from the Moms topics.\n\n    https:\/\/api.meetup.com\/photos.json\/?topic=moms&key=ABDE12456AB2324445\n    ",
		"group": "deprecated",
		"prefer": "\/2\/photos"
	}, {
		"desc": "API method for accessing meetup cities",
		"params": {
			"state": "Return cities in these states [separate states with commas]",
			"country": "Return cities in these countries [separate countries with commas]"
		},
		"formats": ["json", "xml"],
		"response": {
			"lat,lon": "The latitude and longitude of the city's location",
			"country, state, zip": "The country that the city is in, plus state and zip for cities in the U.S",
			"members": "The number of members located in the city",
			"city": "The name of the city"
		},
		"http_method": "GET",
		"scopes": ["basic"],
		"name": "Cities",
		"path": "\/cities",
		"orders": {
			"name": "the city name",
			"members": "total members in the city"
		},
		"prefer": "\/2\/cities",
		"group": "deprecated",
		"examples": "\nReturn all cities in New York.\n\n    https:\/\/api.meetup.com\/cities.xml\/?state=ny&key=ABDE12456AB2324445\n"
	}, {
		"desc": "Returns Meetup cities. This method supports search by latitude\/longitude\/radius, by country\/state, by query term\/zip, or a combination of all of these. Location-only searches by lat and lon return all cities within a radius of the provided coordinates. Searches with a query return up to 10 cities matching the term, and can be sorted by size or distance to a given coordinate. 'smart' ordering can be used to return the match(es) with the highest member_count, unless a smaller size match exists nearby the given coordinates. Query searches are supported for country but not country and state",
		"param_notes": "This method requires no authentication but is subject to [request limiting](\/meetup_api\/docs\/#limits) based on client IP . This search is location based. A lat and lon must be supplied together or a query or the search will be based on your geo-located ip",
		"params": {
			"lon": "Longitude to search",
			"query": "Search term and\/or zip to look for (if this is specified, max result size limited to 10)",
			"state": "A valid state code for the given country, if the country has states",
			"radius": "When searching by lat\/lon only, specify a radius to search (default 50 miles)",
			"lat": "Latitude to search",
			"country": "A valid country code"
		},
		"api_version": "2",
		"formats": ["json", "xml"],
		"response": {
			"id": "Numeric identifier of the city",
			"zip": "The zip code of the city. For cities in countries without ZIP codes, a placeholder will be returned",
			"distance": "The distance away from the provided coordinates, if applicable",
			"lon": "The longitude of the city",
			"member_count": "The number of Meetup members in the city",
			"name_string": "The full name of the city, as returned by query search, if applicable",
			"state": "The state which contains the city, if applicable",
			"ranking": "Indicates the best-match ranking of this result",
			"lat": "The latitude of the city",
			"city": "The name of the city",
			"country": "The ISO_3166-1 country code for the country which contains the city"
		},
		"http_method": "GET",
		"name": "Cities",
		"path": "\/2\/cities",
		"orders": {
			"distance": "When lat\/lon\/query provided, sort matches by distance to coordinates",
			"smart": "Sort by size, but if a match is close to given lat\/lon, float to top. Only works when query provided",
			"size": "(default order) number of members in the city: descending"
		},
		"group": "cities",
		"examples": ""
	}, {
		"desc": "API method for accessing members of Meetup Groups",
		"param_notes": "At least one of the required parameter(s) must be supplied with the request. If any of the groups you specify are private, you will not see its members listed in the result set unless you are a member of that group.",
		"params": {
			"*member_id": "Return the member with this ID",
			"*group_id": "Return members in groups with these ID numbers, separated by commas",
			"*service": "Match users by the external services they've linked to their member account, specified as \"servicename:identifier\". For example, \"service=twitter:@MeetupAPI\" finds any member account that lists @MeetupAPI as its Twitter name (none, currently). You can query against several at a time by separating them with commas.",
			"*relation": "Supply the string \"self\" as the value for this parameter to get the information of the member linked to the API key making the request",
			"*group_urlname": "Return members for the group with the given custom URL path",
			"*topic,groupnum": "Return members for the group with given topic and number",
			"fields": "Request that additional fields (separated by commas) be included in the output."
		},
		"formats": ["json", "rss", "atom", "xml"],
		"http_method": "GET",
		"response": {
			"country, city, state": "Country, City, (and for the US, State) the member has provided",
			"photo_url": "Link to the profile photo of the member",
			"messaging_pref": "returned when the \"fields\" parameter is set to \"messging_pref\". This specifies the members preference for being contacted from members on the site. Possible values are \"orgs_only\", \"groups_only\", \"all_members\"",
			"link": "URL to the member's profile page on meetup.com",
			"lang": "The member's current language preference",
			"visited": "Date and time of member's last activity",
			"id": "The member's id",
			"topics": ["A sampling of 50 topics this member has subscribed to. Only appears if the queried user has not hidden them, or if the authenticated and queried user are the same", {
				"id": "Topic ID",
				"urlkey": "Unique keyword used to identify this topic",
				"name": "Topic name"
			}],
			"joined": "Date and time a member joined",
			"bio": "A description of the member",
			"email": "Member's email address, if requested in fields parameter. This item is only included if the currently authenticated user is the founder of a Meetup Everywhere in which the member has elected to share an email address.",
			"name": "",
			"lat, lon": "Latitude and longitude coordinates of the members reported city",
			"other_services": ["Third-party services associated with the member account", {
				"[service-name]": ["This element is flickr, tumblr, twitter, or linkedin", {
					"identifier": "identifier for the service, a username or URL"
				}]
			}]
		},
		"scopes": ["basic"],
		"name": "Members",
		"path": "\/members",
		"orders": {
			"visited": "member's most recent activity",
			"name": "the name of the member"
		},
		"examples": "\nReturn active members in group 176399\n\n    https:\/\/api.meetup.com\/members.json\/?group_id=176399&key=ABDE12456AB2324445\n\nGet your meetup identify\n\n    https:\/\/api.meetup.com\/members.json\/?relation=self&key=ABDE12345AB2324445\n\n[Try it out](\/meetup_api\/console\/?path=\/members&relation=self#browser)\n    ",
		"group": "deprecated",
		"prefer": "\/2\/members"
	}, {
		"desc": "API method for accessing members of Meetup Groups",
		"param_notes": "At least one of the required parameter(s) must be supplied with the request. If any of the groups you specify are private, you will not see its members listed in the result set unless you are a member of that group.",
		"params": {
			"*member_id": "Return the member with this ID",
			"*group_id": "Return members in groups with these ID numbers, separated by commas",
			"*service": "Match users by the external services they've linked to their member account, specified as \"servicename:identifier\". For example, \"service=twitter:@MeetupAPI\" finds any member account that lists @MeetupAPI as its Twitter name (none, currently). You can query against several at a time by separating them with commas.",
			"*group_urlname": "Return members for the group with the given custom URL path",
			"*topic,groupnum": "Return members for the group with given topic and number",
			"fields": "Request that additional fields (separated by commas) be included in the output."
		},
		"api_version": "2",
		"formats": ["json", "xml"],
		"http_method": "GET",
		"response": {
			"birthday": ["If the authorized is the current member, the member's birthday based on provided information", {
				"month": "Month of birth",
				"year": "Year of birth",
				"day": "Day of birth"
			}],
			"country, city, state": "Country, City, (and for the US, State) the member has provided",
			"messaging_pref": "Returned when the \"fields\" parameter is set to \"messaging_pref\". This specifies the members preference for being contacted from members on the site. Possible values are \"orgs_only\", \"groups_only\", \"all_members\"",
			"link": "URL to the member's profile page on meetup.com",
			"self": ["Optional field, details particular to the authorized user.", {
				"common": ["What the authorized user and queried member have in common", {
					"friends": ["Members who are Facebook friends with both members", {
						"member_state": "Optional field",
						"member_city": "Optional field",
						"name": "Name of the member",
						"member_country": "Optional field",
						"member_id": "Member's ID"
					}],
					"groups": ["Groups the members both belong to", {
						"id": "Group id",
						"group_lat": "Approximate group latitude",
						"name": "Group name",
						"group_lon": "Approximate group longitude",
						"join_mode": "\"open\", \"approval\", or \"closed\"",
						"urlname": "Group URL name",
						"who": "What the group calls its members"
					}]
				}]
			}],
			"lang": "The member's current language preference",
			"id": "The member's id",
			"visited": "Date and time of member's last activity in milliseconds since the epoch",
			"joined": "Date and time a member joined in milliseconds since the epoch",
			"reachable": "Optional fields parameter. If querying by group and the authorized member is an organizer the member's group, this will return false when the member's email address is known to bounce and true otherwise",
			"name": "The member's name",
			"lat, lon": "Latitude and longitude coordinates of the members reported city",
			"gender": "Optional fields parameter. Members can only see their own gender. May be one of none, other, female, male",
			"other_services": ["Third-party services associated with the member account", {
				"[service-name]": ["This element is flickr, tumblr, twitter, or linkedin", {
					"identifier": "identifier for the service, a username or URL"
				}]
			}],
			"hometown": "Hometown of member",
			"membership_count": "Optional field indicating the number of active memberships this member has. If the member has a hidden group preference, this will return 0.",
			"photo_url": "Link to the profile photo of the member",
			"privacy": ["Optional fields parameter. Defines preferences for visibility of certain attributes only returned for the authenticated member", {
				"photos": "may be 'hidden' or 'visible'",
				"topics": "may be 'hidden' or 'visible'",
				"bio": "may be 'hidden' or 'visible'",
				"facebook": "may be 'hidden' or 'visible'. If absent, the member has not connected their Facebook account to Meetup",
				"groups": "may be 'hidden' or 'visible'"
			}],
			"photo": ["The member's photo if available", {
				"photo_link": "URL for a standard size of the photo",
				"highres_link": "URL for the photo at its maximum size",
				"thumb_link": "URL for a thumbnail of the photo",
				"photo_id": "Photo ID"
			}],
			"photos": "List of all the member's photos returned as an array of the representation of the photo property",
			"topics": ["A sampling of 50 topics this member has subscribed to. Only appears if the queried user has not hidden them, or if the authenticated and queried user are the same", {
				"id": "Topic ID",
				"urlkey": "Unique keyword used to identify this topic",
				"name": "Topic name"
			}],
			"bio": "A description of the member",
			"email": "Member's email address, if requested in fields parameter. This item is only included if the currently authenticated user is the founder of a Meetup Everywhere in which the member has elected to share an email address.",
			"messagable": "Returned when the \"fields\" parameter is set to \"messaging_pref\". Returns \"true\" if the authenticated member can message them, \"false\" otherwise."
		},
		"scopes": ["basic"],
		"name": "Members",
		"path": "\/2\/members",
		"orders": {
			"visited": "member's most recent activity",
			"joined": "time member joined Meetup",
			"name": "the name of the member (default order)"
		},
		"examples": "Return active members in group 176399\n\n    https:\/\/api.meetup.com\/2\/members?group_id=176399&key=ABDE12456AB2324445\n\nGet your meetup identify\n\n    https:\/\/api.meetup.com\/members?member_id=self&key=ABDE12345AB2324445\n\n[Try it out](\/meetup_api\/console\/?path=\/2\/members&member_id=self#browser)",
		"group": "members"
	}, {
		"desc": "Retrieve a single member",
		"param_notes": "Only authorization parameters are needed.",
		"tag": "get",
		"params": {
			"fields": "comma-separate list of optional fields"
		},
		"api_version": "2",
		"doc_path": "\/2\/member",
		"formats": ["json", "xml"],
		"http_method": "GET",
		"response": {
			"birthday": ["If the authorized is the current member, the member's birthday based on provided information", {
				"month": "Month of birth",
				"year": "Year of birth",
				"day": "Day of birth"
			}],
			"country, city, state": "Country, City, (and for the US, State) the member has provided",
			"messaging_pref": "Returned when the \"fields\" parameter is set to \"messaging_pref\". This specifies the members preference for being contacted from members on the site. Possible values are \"orgs_only\", \"groups_only\", \"all_members\"",
			"link": "URL to the member's profile page on meetup.com",
			"self": ["Optional field, details particular to the authorized user.", {
				"common": ["What the authorized user and queried member have in common", {
					"friends": ["Members who are Facebook friends with both members", {
						"member_state": "Optional field",
						"member_city": "Optional field",
						"name": "Name of the member",
						"member_country": "Optional field",
						"member_id": "Member's ID"
					}],
					"groups": ["Groups the members both belong to", {
						"id": "Group id",
						"group_lat": "Approximate group latitude",
						"name": "Group name",
						"group_lon": "Approximate group longitude",
						"join_mode": "\"open\", \"approval\", or \"closed\"",
						"urlname": "Group URL name",
						"who": "What the group calls its members"
					}]
				}]
			}],
			"lang": "The member's current language preference",
			"id": "The member's id",
			"visited": "Date and time of member's last activity in milliseconds since the epoch",
			"joined": "Date and time a member joined in milliseconds since the epoch",
			"reachable": "Optional fields parameter. If querying by group and the authorized member is an organizer the member's group, this will return false when the member's email address is known to bounce and true otherwise",
			"name": "The member's name",
			"lat, lon": "Latitude and longitude coordinates of the members reported city",
			"gender": "Optional fields parameter. Members can only see their own gender. May be one of none, other, female, male",
			"other_services": ["Third-party services associated with the member account", {
				"[service-name]": ["This element is flickr, tumblr, twitter, or linkedin", {
					"identifier": "identifier for the service, a username or URL"
				}]
			}],
			"hometown": "Hometown of member",
			"membership_count": "Optional field indicating the number of active memberships this member has. If the member has a hidden group preference, this will return 0.",
			"photo_url": "Link to the profile photo of the member",
			"privacy": ["Optional fields parameter. Defines preferences for visibility of certain attributes only returned for the authenticated member", {
				"photos": "may be 'hidden' or 'visible'",
				"topics": "may be 'hidden' or 'visible'",
				"bio": "may be 'hidden' or 'visible'",
				"facebook": "may be 'hidden' or 'visible'. If absent, the member has not connected their Facebook account to Meetup",
				"groups": "may be 'hidden' or 'visible'"
			}],
			"photo": ["The member's photo if available", {
				"photo_link": "URL for a standard size of the photo",
				"highres_link": "URL for the photo at its maximum size",
				"thumb_link": "URL for a thumbnail of the photo",
				"photo_id": "Photo ID"
			}],
			"photos": "List of all the member's photos returned as an array of the representation of the photo property",
			"topics": ["A sampling of 50 topics this member has subscribed to. Only appears if the queried user has not hidden them, or if the authenticated and queried user are the same", {
				"id": "Topic ID",
				"urlkey": "Unique keyword used to identify this topic",
				"name": "Topic name"
			}],
			"bio": "A description of the member",
			"email": "Member's email address, if requested in fields parameter. This item is only included if the currently authenticated user is the founder of a Meetup Everywhere in which the member has elected to share an email address.",
			"messagable": "Returned when the \"fields\" parameter is set to \"messaging_pref\". Returns \"true\" if the authenticated member can message them, \"false\" otherwise."
		},
		"scopes": ["basic"],
		"name": "Member Get",
		"path": "\/2\/member\/:id",
		"examples": "",
		"group": "members"
	}, {
		"desc": "Edit the authorized member's attributes",
		"param_notes": "This method requires tls. Only the authorized user may edit their own propertries. A city may be provided by either a city_id or a combination of lat and lon",
		"tag": "edit",
		"params": {
			"birthday": "Day you were born. Format should be in the form of yyyy or mmddyyyy. A value of -1 indicates that birthday data should be cleared.",
			"zip": "Valid zip code for city",
			"topics_privacy": "Controls the visibility of the member's topics. May be one of hidden, visible",
			"lon": "longitude of city",
			"hometown": "Hometown of member. Can not be longer than 64 characters",
			"remove_topics": "Comma-delimited list of topic ids to remove from your alert list",
			"bio_privacy": "Controls the visibility of the member's bio. May be one of hidden, visible",
			"photos_privacy": "Controls the visibility of the member's photos. May be one of hidden, visible",
			"lang": "Language preference used on the site. Valid values are en_us, de, es, fr, it, pt",
			"country": "Valid country code for your location",
			"city": "City name for your location",
			"city_id": "Valid city id from \/2\/cities method",
			"sync_photo": "When set to true, this parameter will sync all of the group profile photos for the member with the provided photo_id",
			"groups_privacy": "Controls the visibility of the member's groups. May be one of hidden, visible",
			"bio": "Free form text passage about you. must be less than 250 characters",
			"name": "The name of the current member",
			"gender": "Your gender (used for better recommendations). Valid values are be one of none, other, female, male",
			"radius": "radius, in miles to search for city given a lat and lon. default 25.0, max 100.0",
			"facebook_privacy": "Controls the visibility of the member's facebook connection. May be one of hidden, visible. If the member has not connected their Facebook account, attempts to set this preference will do nothing.",
			"photo_id": "A valid photo_id from the member's photos to set as the main profile photo",
			"lat": "latitude of city",
			"add_topics": "Comma-delimited list of topics ids to add to your alert list"
		},
		"api_version": "2",
		"doc_path": "\/2\/member",
		"formats": ["json", "xml"],
		"http_method": "POST",
		"response": {
			"birthday": ["If the authorized is the current member, the member's birthday based on provided information", {
				"month": "Month of birth",
				"year": "Year of birth",
				"day": "Day of birth"
			}],
			"country, city, state": "Country, City, (and for the US, State) the member has provided",
			"messaging_pref": "Returned when the \"fields\" parameter is set to \"messaging_pref\". This specifies the members preference for being contacted from members on the site. Possible values are \"orgs_only\", \"groups_only\", \"all_members\"",
			"link": "URL to the member's profile page on meetup.com",
			"self": ["Optional field, details particular to the authorized user.", {
				"common": ["What the authorized user and queried member have in common", {
					"friends": ["Members who are Facebook friends with both members", {
						"member_state": "Optional field",
						"member_city": "Optional field",
						"name": "Name of the member",
						"member_country": "Optional field",
						"member_id": "Member's ID"
					}],
					"groups": ["Groups the members both belong to", {
						"id": "Group id",
						"group_lat": "Approximate group latitude",
						"name": "Group name",
						"group_lon": "Approximate group longitude",
						"join_mode": "\"open\", \"approval\", or \"closed\"",
						"urlname": "Group URL name",
						"who": "What the group calls its members"
					}]
				}]
			}],
			"lang": "The member's current language preference",
			"id": "The member's id",
			"visited": "Date and time of member's last activity in milliseconds since the epoch",
			"joined": "Date and time a member joined in milliseconds since the epoch",
			"reachable": "Optional fields parameter. If querying by group and the authorized member is an organizer the member's group, this will return false when the member's email address is known to bounce and true otherwise",
			"name": "The member's name",
			"lat, lon": "Latitude and longitude coordinates of the members reported city",
			"gender": "Optional fields parameter. Members can only see their own gender. May be one of none, other, female, male",
			"other_services": ["Third-party services associated with the member account", {
				"[service-name]": ["This element is flickr, tumblr, twitter, or linkedin", {
					"identifier": "identifier for the service, a username or URL"
				}]
			}],
			"hometown": "Hometown of member",
			"membership_count": "Optional field indicating the number of active memberships this member has. If the member has a hidden group preference, this will return 0.",
			"photo_url": "Link to the profile photo of the member",
			"privacy": ["Optional fields parameter. Defines preferences for visibility of certain attributes only returned for the authenticated member", {
				"photos": "may be 'hidden' or 'visible'",
				"topics": "may be 'hidden' or 'visible'",
				"bio": "may be 'hidden' or 'visible'",
				"facebook": "may be 'hidden' or 'visible'. If absent, the member has not connected their Facebook account to Meetup",
				"groups": "may be 'hidden' or 'visible'"
			}],
			"photo": ["The member's photo if available", {
				"photo_link": "URL for a standard size of the photo",
				"highres_link": "URL for the photo at its maximum size",
				"thumb_link": "URL for a thumbnail of the photo",
				"photo_id": "Photo ID"
			}],
			"photos": "List of all the member's photos returned as an array of the representation of the photo property",
			"topics": ["A sampling of 50 topics this member has subscribed to. Only appears if the queried user has not hidden them, or if the authenticated and queried user are the same", {
				"id": "Topic ID",
				"urlkey": "Unique keyword used to identify this topic",
				"name": "Topic name"
			}],
			"bio": "A description of the member",
			"email": "Member's email address, if requested in fields parameter. This item is only included if the currently authenticated user is the founder of a Meetup Everywhere in which the member has elected to share an email address.",
			"messagable": "Returned when the \"fields\" parameter is set to \"messaging_pref\". Returns \"true\" if the authenticated member can message them, \"false\" otherwise."
		},
		"scopes": ["basic"],
		"name": "Member Edit",
		"path": "\/2\/member\/:id",
		"examples": "",
		"group": "members"
	}, {
		"desc": "This method allows messaging-authorized requests to send messages between members",
		"param_notes": "This method requires an HTTP POST and OAuth authorization in combination with the __messaging__ [permission scope](\/meetup_api\/auth\/#oauth2-scopes). All required parameters must be supplied. You can call this method with __dryrun__ set to true if you wish to test the validation logic before sending the actual request",
		"params": {
			"*member_id": "ID of member to message.",
			"hide_email": "Hides sender's email from receiving member, defaults to false",
			"cc_sender": "Sends a copy of the message to the sender, defaults to true.",
			"group_id": "ID of group that sender has relationship with member in",
			"*message": "Text of message to body",
			"dryrun": "Performs request without sending message. Useful for pre-testing error conditions.",
			"*subject": "Text of message subject"
		},
		"api_version": "2",
		"doc_path": "\/2\/message",
		"formats": ["json", "xml"],
		"http_method": "POST",
		"scopes": ["basic", "messaging"],
		"name": "Message Create",
		"path": "\/2\/message",
		"response_notes": "If successful, this method returns a 202 Accepted response.\n\n400 Bad requests may be returned under certain conditions along with a response object containing information about the failure. The __code__ property of this may be one of\n\n__bad_member__: the sender or the receiver was not an active member\n\n__bad_group__: the provided group_id was invalid\n\n__limit__: limit of __12__ messages a day exceeded\n\n__msg_too_long__: message was longer than __5000__ characters\n\n__pref_conflict__: the recipient's preferences disallow the sender from sending message\n\n__recip_not_affiliated__: request was made with a group_id the recipient is not a member of\n\n__self_send__: attempt made to send a message the sender\n\n__sender_not_affiliated__: request made with group_id the sender is not a member of\n\n__sender_not_member__: sender is not a member of any groups\n\n__subject_too_long__: subject was too long\n\n__blocked__: this member blocked you\n\n__spam__: message was flagged as spam\n\n__transport__: error sending message",
		"examples": "Sends a message from one member to another\n\n    curl -X POST 'https:\/\/api.meetup.com\/2\/message?access_token=PRE_AUTHORIZED_TO_MESSSAGE'\n       -F 'member_id=MEMBER_ID'\n       -F 'group_id=SHARED_GROUP'\n       -F 'subject=upcoming talks'\n       -F 'message=looking for speakers for my upcoming meetup. are you interested?'\n    ",
		"group": "messaging"
	}, {
		"desc": "This method returns member *profiles* associated with a particular group. Meetup members have separate profiles for each group they join.",
		"param_notes": "At least one of the required parameter(s) must be supplied with the request. If any of the groups you specify are private, you will not see its members listed in the result set unless you are a member of that group. If querying for member_id alone, the member's 'hide groups' preference will be honored. 'Interesting' ordered searches only support searching by group_urlname or group_id. Only one of those may be supplied. ",
		"params": {
			"*member_id": "Return the profiles for members with these IDs, separated by commas",
			"*topic, groupnum": "Group identification by topic, deprecated",
			"status": "Status filter for members. Only organizers may see pending. Request must also contain a `group_id` or `group_urlname`. Status may be one of active, pending",
			"*group_id": "Return profiles in the group with this ID",
			"role": "if \"leads\", only profiles for members of the leadership team are included",
			"*group_urlname": "Return profiles for the group with the given custom URL path",
			"fields": "comma delimited list of optional response properties. A value of \"membership_dues\" will populate membership dues for the authorized user or members of the groups the authorized user organizes"
		},
		"api_version": "2",
		"formats": ["json", "xml"],
		"http_method": "GET",
		"response": {
			"profile_url": "Link to the member's group profile page",
			"status": "Value may be one of pending_payment, blocked, active, pending",
			"photo_url": "Link to the group profile photo of the member",
			"answers": ["Answers to group profile questions. Unanswered questions will be returned without an answer property if \"empty_answers\" is provided as a \"fields\" property value", {
				"answer": "Text of the answer",
				"question": "Text of the question",
				"question_id": "Unique ID of the question this answers"
			}],
			"member_country": "Optional fields parameter for the Member's country code",
			"membership_dues": ["Optional fields parameter for the last payment received for the Group's membership dues and optionally, the status of the member's dues for the current billing period if the group has set up recurring membership dues payments. This field is only visible only to the organizer of the group and to the member themselves. Members can not see other member's membership dues", {
				"total_amount": "Total amount paid",
				"period_status": "For groups with recurring billing periods, this returns one of the following values grace, paid, pending, unpaid",
				"transaction_time": "Time the transaction was made in milliseconds since the epoch",
				"paid_until": "For groups with recurring billing periods, this returns the time in milliseconds since the epoch that the member's next payment is due",
				"cancelled": "For groups with recurring billing periods, this Boolean field indicates that membership dues were cancelled",
				"trial": ["If the group offers a trial membership, this indicates information for unpaid members.", {
					"expired": "Boolean indicator of whether or not the unpaid subscription has expired or not",
					"days": "The total number of trial days offered by the group",
					"days_remaining": "The number of days remaining in the member's trial period"
				}]
			}],
			"photo": ["The member's photo if available", {
				"photo_link": "URL for a standard size of the photo",
				"highres_link": "URL for the photo at its maximum size",
				"thumb_link": "URL for a thumbnail of the photo",
				"photo_id": "Photo ID"
			}],
			"attendance_count": "Optional fields property representing number of times the member has attended a Meetup in the associated group.",
			"member_id": "The member's id",
			"visited": "Member's last visit to the group site, in milliseconds since the epoch",
			"title": "Title assigned to the member in this group",
			"member_state": "Optional fields parameter for the Member's state (when country is us)",
			"site_url, site_name": "External site listed by the member",
			"member_city": "Optional fields parameter for the Member's city",
			"bio": "Member's 'introduction' to the group",
			"additional": "Additional information supplied by the member",
			"name": "The member's name",
			"created, updated": "When this member profile was created and last updated, in milliseconds since the epoch.",
			"role": "If applicable, the member's role in the group (Organizer, Assistant Organizer, Co-organizer, or Event Organizer)",
			"comment": "What this member says about this group",
			"group": ["The group this profile belongs to", {
				"id": "Group id",
				"group_lat": "Approximate group latitude",
				"name": "Group name",
				"group_lon": "Approximate group longitude",
				"join_mode": "\"open\", \"approval\", or \"closed\"",
				"urlname": "Group URL name",
				"who": "What the group calls its members"
			}],
			"other_services": ["Third-party services associated with the member account", {
				"[service-name]": ["This element is flickr, tumblr, twitter, or linkedin", {
					"identifier": "identifier for the service, a username or URL"
				}]
			}]
		},
		"scopes": ["basic"],
		"name": "Profiles",
		"path": "\/2\/profiles",
		"orders": {
			"visited": "last visit to group pages (default order)",
			"joined": "time member joined this group",
			"updated": "profile updated field",
			"name": "the name of the member",
			"interesting": "Order which may be interesting to the authorized member",
			"member_id": "the id of the member"
		},
		"examples": "\nReturn active member profiles in group 176399\n\n    https:\/\/api.meetup.com\/2\/profiles.json\/?group_id=176399&key=ABDE12456AB2324445\n    ",
		"group": "profiles"
	}, {
		"desc": "This method allows an authenticated member to join a group by creating a profile",
		"param_notes": "This method requires an HTTP POST. All required parameters must be supplied. An intro and answers may be required based on the group the member is joining. To find out if a group requires an intro or answers to questions, query for the group through one of the [Groups methods](\/meetup_api\/docs\/2\/groups) providing setting the __fields__ parameter to __join_info__ and inspecting the __join_info__ in the results. Answers to the questions must be named using the convention __answer_{question_id}__",
		"tag": "create",
		"params": {
			"answer_{qid}": "Answers to questions from groups API join_info question fields",
			"*group_id": "Id of group to join",
			"new_photo": "file upload for a new member photo",
			"site_name": "Name of member's site. Max length is 32",
			"*group_urlname": "Urlname of group to join",
			"photo_id": "photo_id of the photo to use for this profile",
			"intro": "Provides a Member an opportunity to tell the group about themselves",
			"site_url": "Link to member's site. Max length is 80"
		},
		"api_version": "2",
		"doc_path": "\/2\/profile",
		"formats": ["json", "xml"],
		"http_method": "POST",
		"scopes": ["basic"],
		"name": "Profile Create (Group Join)",
		"path": "\/2\/profile",
		"response_notes": "If successful, this method returns a 201 Created response with a Location header containing the [Profile Get](\/meetup_api\/docs\/2\/profile\/#get) URI to access this profile.\n\n400 Bad requests may be returned under certain conditions along with a response object containing information about the failure. The __code__ property of this may be one of\n\n * bad_group: invalid group was provided\n * bad_member: invalid member was provided\n * invalid_photo: invalid photo_id was provided\n * missing_photo: photo was required to join but one could not be resolved\n * member_exists: member has already joined the group\n * member_banned: member has been banned from the group\n * join_closed: this group is not allowing new members\n * join_viaweb: this join is not supported in the API, try joining via the website\n * membership_pending: awaiting organizer approval\n * missing_intro: request required a valid intro\n * missing_answer: request was missing an answer to a required question\n * invalid_answer: request contained invalid question answer\n * invalid_url: invalid site_url\n * invalid_site_name: site name was too long\n * unknown_error: a generic error\n\nThe __details__ property of this object will contain additional information. The content body of a successful request is the same of that returned by the [Profile Get](\/meetup_api\/docs\/2\/profile\/#getresponse) query method.",
		"examples": "\nJoin the open group foo-bar\n\n    curl -X POST 'https:\/\/api.meetup.com\/2\/profile'\n       -F 'group_urlname=foo-bar'\n       -F 'key=YOURKEY'\n\nJoin a group named foo-bar that requires answers to questions and an intro\n\n    # get the group's join info\n    curl 'https:\/\/api.meetup.com\/2\/groups\/?key=YOURKEY&group_urlname=foo-bar&fields=join_info'\n\n    # answer in POST to \/2\/profile\n    curl -X POST 'https:\/\/api.meetup.com\/2\/profile'\n       -F 'group_urlname=foo-bar'\n       -F 'intro=well hello'\n       -F 'answer_123=answering question 123'\n       -F 'answer_456=answer question 456'\n       -F 'key=YOURKEY'\n    ",
		"group": "profiles"
	}, {
		"desc": "Update a member's group profile",
		"param_notes": "The `gid` and `mid` in this method's path are group and member IDs, both needed to uniquely identify the member profile to be edited. An authenticated user may update their own profile by substituting \"self\" for the `mid`. All POST parameters are optional unless required by the group. Only the organizer of the group may edit the member's `title` and `role` within the group. Those are the only things the organizer may edit. When requesting to set a role with `add_role` the member's previous role will be cleared. Members may edit all other fields of their own profiles with the exception of `title`, `add_role`, and `remove_role`. This method requires an HTTP POST.",
		"tag": "edit",
		"params": {
			"answer_{qid}": "Answers to questions from groups API join_info question fields",
			"title": "An organizer-defined member title.",
			"remove_role": "Allows those with permission to remove one of the following roles: event_organizer, coorganizer, assistant_organizer",
			"new_photo": "file upload for a new member photo",
			"site_name": "Name of member's site. Max length is 32",
			"photo_id": "photo_id of the photo to use for this profile",
			"add_role": "Allows those with permission to assign one of the following roles: event_organizer, coorganizer, assistant_organizer",
			"intro": "Provides a Member an opportunity to tell the group about themselves",
			"site_url": "Link to member's site. Max length is 80"
		},
		"api_version": "2",
		"doc_path": "\/2\/profile",
		"formats": ["json", "xml"],
		"http_method": "POST",
		"scopes": ["basic"],
		"name": "Profile Edit",
		"path": "\/2\/profile\/:gid\/:mid",
		"response_notes": "If successful, this method responds with 200 OK. 401 Unauthorized is returned if the currently authenticated member can not edit the specified profile. The content body is the same as  that returned by the [Profile Get](\/meetup_api\/docs\/2\/profile\/#getresponse) query method. 400 responses may also contain the error codes listed in the [Profile Create](\/meetup_api\/docs\/2\/profile\/#createresponse) method with the addition of `invalid_role` which is returned when the role adjustment was failed to be applied.",
		"examples": "",
		"group": "profiles"
	}, {
		"desc": "Retrieves a single group profile",
		"param_notes": "Only authorization parameters are needed.",
		"tag": "get",
		"params": {
			"fields": "Request that additional fields (separated by commas) be included in the output"
		},
		"api_version": "2",
		"doc_path": "\/2\/profile",
		"formats": ["json", "xml"],
		"http_method": "GET",
		"response": {
			"profile_url": "Link to the member's group profile page",
			"status": "Value may be one of pending_payment, blocked, active, pending",
			"photo_url": "Link to the group profile photo of the member",
			"answers": ["Answers to group profile questions. Unanswered questions will be returned without an answer property if \"empty_answers\" is provided as a \"fields\" property value", {
				"answer": "Text of the answer",
				"question": "Text of the question",
				"question_id": "Unique ID of the question this answers"
			}],
			"member_country": "Optional fields parameter for the Member's country code",
			"membership_dues": ["Optional fields parameter for the last payment received for the Group's membership dues and optionally, the status of the member's dues for the current billing period if the group has set up recurring membership dues payments. This field is only visible only to the organizer of the group and to the member themselves. Members can not see other member's membership dues", {
				"total_amount": "Total amount paid",
				"period_status": "For groups with recurring billing periods, this returns one of the following values grace, paid, pending, unpaid",
				"transaction_time": "Time the transaction was made in milliseconds since the epoch",
				"paid_until": "For groups with recurring billing periods, this returns the time in milliseconds since the epoch that the member's next payment is due",
				"cancelled": "For groups with recurring billing periods, this Boolean field indicates that membership dues were cancelled",
				"trial": ["If the group offers a trial membership, this indicates information for unpaid members.", {
					"expired": "Boolean indicator of whether or not the unpaid subscription has expired or not",
					"days": "The total number of trial days offered by the group",
					"days_remaining": "The number of days remaining in the member's trial period"
				}]
			}],
			"photo": ["The member's photo if available", {
				"photo_link": "URL for a standard size of the photo",
				"highres_link": "URL for the photo at its maximum size",
				"thumb_link": "URL for a thumbnail of the photo",
				"photo_id": "Photo ID"
			}],
			"attendance_count": "Optional fields property representing number of times the member has attended a Meetup in the associated group.",
			"member_id": "The member's id",
			"visited": "Member's last visit to the group site, in milliseconds since the epoch",
			"title": "Title assigned to the member in this group",
			"member_state": "Optional fields parameter for the Member's state (when country is us)",
			"site_url, site_name": "External site listed by the member",
			"member_city": "Optional fields parameter for the Member's city",
			"bio": "Member's 'introduction' to the group",
			"additional": "Additional information supplied by the member",
			"name": "The member's name",
			"created, updated": "When this member profile was created and last updated, in milliseconds since the epoch.",
			"role": "If applicable, the member's role in the group (Organizer, Assistant Organizer, Co-organizer, or Event Organizer)",
			"comment": "What this member says about this group",
			"group": ["The group this profile belongs to", {
				"id": "Group id",
				"group_lat": "Approximate group latitude",
				"name": "Group name",
				"group_lon": "Approximate group longitude",
				"join_mode": "\"open\", \"approval\", or \"closed\"",
				"urlname": "Group URL name",
				"who": "What the group calls its members"
			}],
			"other_services": ["Third-party services associated with the member account", {
				"[service-name]": ["This element is flickr, tumblr, twitter, or linkedin", {
					"identifier": "identifier for the service, a username or URL"
				}]
			}]
		},
		"scopes": ["basic"],
		"name": "Profile Get",
		"path": "\/2\/profile\/:gid\/:mid",
		"examples": "",
		"group": "profiles"
	}, {
		"desc": "Deletes a member's group profile",
		"param_notes": "All parameters are optional. Only the authorized member is permitted leave groups they do not organize. This method may not be used by organizers to remove members.",
		"tag": "delete",
		"params": {
			"exit_comment": "Optional message to the organizer when leaving"
		},
		"api_version": "2",
		"doc_path": "\/2\/profile",
		"formats": ["json", "xml"],
		"http_method": "DELETE",
		"scopes": ["basic"],
		"name": "Profile Delete (Leave Group)",
		"path": "\/2\/profile\/:gid\/:mid",
		"response_notes": "If successful, this method responds with 200 OK, otherwise a 400 Bad request is returned or 401 if the profile being deleted does not belong to the authorized member. This method requires HTTP DELETE.",
		"examples": "",
		"group": "profiles"
	}, {
		"desc": "Delete specified event photo",
		"param_notes": "Only authorization parameters are needed. Authorized user must be the original poster of the photo or the organizer of the group the photo was posted in",
		"tag": "delete",
		"api_version": "2",
		"doc_path": "\/2\/photo",
		"formats": ["json", "xml"],
		"http_method": "DELETE",
		"scopes": ["basic"],
		"name": "Photo Delete",
		"path": "\/2\/photo\/:id",
		"response_notes": "Returns a HTTP 200 response if the delete was successful, 401 if unauthorized.",
		"examples": "Delete an event photo\n\n    curl -X DELETE https:\/\/api.meetup.com\/2\/photo\/PHOTO_ID?key=API_KEY\n    ",
		"group": "photos"
	}, {
		"desc": "Delete the specified member photo",
		"param_notes": "Only authorization parameters are needed. Authorized user must be the member owning the photo",
		"tag": "delete",
		"api_version": "2",
		"formats": ["json", "xml"],
		"doc_path": "\/2\/member_photo",
		"http_method": "DELETE",
		"name": "Member Photo Delete",
		"path": "\/2\/member_photo\/:id",
		"response_notes": "Returns a HTTP 200 response if the delete was successful, 401 if unauthorized",
		"group": "members",
		"examples": "Delete a member photo\n\n    curl -X DELETE https:\/\/api.meetup.com\/2\/member_photo\/PHOTO_ID?key=API_KEY\n    "
	}, {
		"desc": "API method for accessing meetup group comments",
		"param_notes": "At least one of the required parameter(s) must be supplied with the request.",
		"params": {
			"*topic, groupnum": "Return comments for the group with given topic and number",
			"*group_id": "Return comments in groups with these ID numbers [separated by commas]",
			"*group_urlname": "Return comments for the group with this custom URL path"
		},
		"formats": ["json", "xml", "rss", "atom"],
		"response": {
			"country,city,state": "Country, City, (and for the US, State) the member has provided",
			"lat,lon": "Latitude and longitude coordinates of the members reported city",
			"created": "The time and date that the comment was created",
			"photo_url": "Link to the profile photo of the member",
			"name": "The name of the member that posted the comment",
			"link": "Link to the members profile page",
			"comment": "Text of the comment that was posted"
		},
		"http_method": "GET",
		"scopes": ["basic"],
		"name": "Comments",
		"path": "\/comments",
		"orders": {
			"ctime": "the date the comment was posted"
		},
		"group": "groups",
		"examples": "\nReturn comments from the NY Tech Group.\n\n    https:\/\/api.meetup.com\/comments.json\/?topic=newtech&groupnum=1&key=ABDE12456AB2324445\n    "
	}, {
		"desc": "This method returns messages that appear under \"Talk about this Meetup\". To post messages, see the corresponding write method.",
		"param_notes": "At least one of the required parameters must be supplied with the request.",
		"params": {
			"show_diffs": "Return auto-generated event change comments. Default value is true, turn off by specifying \"show_diffs=false\".",
			"*member_id": "Return comments for the given member_ids, separated by commas",
			"*group_id": "Return comments in groups with these ID numbers, separated by commas",
			"*event_id": "Return comments on these events, separated by commas.",
			"*comment_id": "Return comments for a given set of comment IDs, separated by commas",
			"fields": "Optionally accepts the value \"member_photo\" or \"notifications\""
		},
		"api_version": "2",
		"formats": ["json", "xml"],
		"http_method": "GET",
		"response": {
			"event_diff_id": "The ID of this comment if it is an auto-generated event change comment",
			"comment_url": "URL for the event comment on meetup.com",
			"group_id": "The ID of the group that the event belongs to",
			"event_id": "The string ID of the event the comment belongs to",
			"self": ["Optional field with details particular to the authorized user, only present if requested and user is a member of the hosting group", {
				"actions": "list of actions the current user may perform on this comment, potentially: 'flag_spam', 'delete', 'like' or 'unlike'"
			}],
			"in_reply_to": "If this is a reply, the ID of the comment replied to",
			"member_id": "The ID of the member that posted the comment. May be 0 for former members",
			"member_photo": ["If the optional \"fields\" parameter contains \"member_photo\", the member photo associated with the comment", {
				"photo_link": "URL for the standard sized photo",
				"hires_link": "URL for the original sized photo",
				"thumb_link": "URL for the thumbnail sized photo",
				"photo_id": "ID of the photo"
			}],
			"notifications": "optional fields parameter to append the authorized member's current notification preference for the given comment",
			"event": ["Optional field, basic info on event associated with comment", {
				"id": "String ID of the event",
				"time": "UTC start time of the event, in milliseconds since the epoch",
				"event_url": "URL of the event's page on meetup.com",
				"name": "Name of the event"
			}],
			"like_count": "optional fields parameter which adds the number of likes this comment has received",
			"member_name": "The name of the member that posted the comment. May be \"Former Member\" for former members",
			"comment": "The comment the member left for the event",
			"event_comment_id": "The ID of this comment"
		},
		"scopes": ["basic"],
		"name": "Comments v2",
		"path": "\/2\/event_comments",
		"orders": {
			"time": "Order by the time that each rating was posted (default: descending)",
			"thread": "Order by comment threads, those with the most recent activity are listed first. Only one event may be provided and desc not supported. Also note that with this ordering, *replies* are excluded from pagination accounting. Only top-level comments will be capped at the page size.",
			"name": "Order by the name of the member"
		},
		"examples": "",
		"group": "events"
	}, {
		"desc": "This method posts messages that appear under \"Talk about this Meetup\".",
		"param_notes": "All of the required parameters must be supplied with the request, which must be an HTTP POST. The currently authenticated user must be a member of the group hosting the event",
		"tag": "create",
		"params": {
			"notifications": "Notification control for authorized member on this comment thread. \"on\" will result in notifications being sent. \"off\" will opt the member out of notifications for this comment thread. Defaults to \"on\" unless the member previous opted out of notifications on the thread.",
			"*in_reply_to": "If this comment is a reply, the ID of the comment being replied to",
			"*event_id": "The event related to this comment.",
			"*comment": "The comment text"
		},
		"api_version": "2",
		"formats": ["json", "xml"],
		"http_method": "POST",
		"scopes": ["basic"],
		"name": "Event Comment v2",
		"path": "\/2\/event_comment",
		"response_notes": "If successful, this method responds with a \"201 Created\" status and a JSON or XML body consisting of the posted comment in the same fields as the response items of the [Event Comment Get](\/meetup_api\/docs\/2\/event_comment\/#get) method.",
		"examples": "\nPost a comment to event ID 1234.\n\n    curl -i \"https:\/\/api.meetup.com\/2\/event_comment\" -d \"event_id=1234&comment=hello+world&key=ABDE12456AB232445\"\n\nPost a reply for comment ID 4567\n\n    curl -i \"https:\/\/api.meetup.com\/2\/event_comment\" -d \"in_reply_to=4567&comment=i'm+in&key=ABCDE12345\"\n\n    ",
		"group": "events"
	}, {
		"desc": "Retrieve a single event comment or reply",
		"param_notes": "Only authorization parameters are needed.",
		"tag": "get",
		"params": {
			"fields": "comma-separate list of optional fields"
		},
		"api_version": "2",
		"doc_path": "\/2\/event_comment",
		"formats": ["json", "xml"],
		"http_method": "GET",
		"response": {
			"event_diff_id": "The ID of this comment if it is an auto-generated event change comment",
			"comment_url": "URL for the event comment on meetup.com",
			"group_id": "The ID of the group that the event belongs to",
			"event_id": "The string ID of the event the comment belongs to",
			"self": ["Optional field with details particular to the authorized user, only present if requested and user is a member of the hosting group", {
				"actions": "list of actions the current user may perform on this comment, potentially: 'flag_spam', 'delete', 'like' or 'unlike'"
			}],
			"in_reply_to": "If this is a reply, the ID of the comment replied to",
			"member_id": "The ID of the member that posted the comment. May be 0 for former members",
			"member_photo": ["If the optional \"fields\" parameter contains \"member_photo\", the member photo associated with the comment", {
				"photo_link": "URL for the standard sized photo",
				"hires_link": "URL for the original sized photo",
				"thumb_link": "URL for the thumbnail sized photo",
				"photo_id": "ID of the photo"
			}],
			"notifications": "optional fields parameter to append the authorized member's current notification preference for the given comment",
			"replies": "Optional fields parameter returning array of the last 20 replies to comment",
			"event": ["Optional field, basic info on event associated with comment", {
				"id": "String ID of the event",
				"time": "UTC start time of the event, in milliseconds since the epoch",
				"event_url": "URL of the event's page on meetup.com",
				"name": "Name of the event"
			}],
			"like_count": "optional fields parameter which adds the number of likes this comment has received",
			"member_name": "The name of the member that posted the comment. May be \"Former Member\" for former members",
			"comment": "The comment the member left for the event",
			"event_comment_id": "The ID of this comment"
		},
		"scopes": ["basic"],
		"name": "Event Comment Get",
		"path": "\/2\/event_comment\/:id",
		"examples": "",
		"group": "events"
	}, {
		"desc": "Delete a single event comment or reply",
		"param_notes": "Only authorization parameters are needed.",
		"tag": "delete",
		"params": {
			"fields": "comma-separate list of optional fields"
		},
		"api_version": "2",
		"doc_path": "\/2\/event_comment",
		"formats": ["json", "xml"],
		"http_method": "DELETE",
		"scopes": ["basic"],
		"name": "Event Comment Delete",
		"path": "\/2\/event_comment\/:id",
		"response_notes": "Returns an HTTP 200 response if delete was successful, 401 if unauthorized.",
		"examples": "",
		"group": "events"
	}, {
		"desc": "This method creates a spam report for comment content",
		"param_notes": "All required parameters must be supplied.",
		"tag": "create",
		"params": {
			"reason": "Reason for flagging the comment. May be one of inappropriate, spam",
			"*comment_id": "The id of the comment"
		},
		"api_version": "2",
		"formats": ["json", "xml"],
		"http_method": "POST",
		"scopes": ["basic"],
		"name": "Event Comment Flag",
		"path": "\/2\/event_comment_flag",
		"response_notes": "If successful, this method returns a 202 Accepted response.",
		"examples": "",
		"group": "events"
	}, {
		"desc": "Unsubscribe to notifications for updates to a given comment thread",
		"param_notes": "Only authorization parameters are needed. :id in the path should be the id of comment being replied to which you are unsubscribing to notifications from",
		"tag": "delete",
		"api_version": "2",
		"doc_path": "\/2\/event_comment_subscribe",
		"formats": ["json", "xml"],
		"http_method": "DELETE",
		"scopes": ["basic"],
		"name": "Event Comment Unsubscribe",
		"path": "\/2\/event_comment_subscribe\/:id",
		"response_notes": "Returns an HTTP 200 response if delete was successful, 401 if unauthorized.",
		"examples": "",
		"group": "events"
	}, {
		"desc": "Subscribe to notifications on updates to a given comment thread",
		"param_notes": "Only authorization parameters are needed. :id in the path should be id of comment being replied to which you are subscribing to notifications for",
		"tag": "edit",
		"api_version": "2",
		"doc_path": "\/2\/event_comment_subscribe",
		"formats": ["json", "xml"],
		"http_method": "POST",
		"scopes": ["basic"],
		"name": "Event Comment Subscribe",
		"path": "\/2\/event_comment_subscribe\/:id",
		"response_notes": "Returns an HTTP 200 response if delete was successful, 401 if unauthorized.",
		"examples": "",
		"group": "events"
	}, {
		"desc": "Like a given Event comment",
		"param_notes": "Only authorization parameters are needed. :id in the path should be the id of the comment you are liking",
		"tag": "create",
		"api_version": "2",
		"doc_path": "\/2\/event_comment_like",
		"formats": ["json", "xml"],
		"http_method": "POST",
		"scopes": ["basic"],
		"name": "Event Comment Like",
		"path": "\/2\/event_comment_like\/:id",
		"response_notes": "Returns an HTTP 200 response if delete was successful, 401 if unauthorized.",
		"examples": "",
		"group": "events"
	}, {
		"desc": "Unlike a given Event comment",
		"param_notes": "Only authorization parameters are needed. :id in the path should be the id of the comment you are unliking",
		"tag": "delete",
		"api_version": "2",
		"doc_path": "\/2\/event_comment_like",
		"formats": ["json", "xml"],
		"http_method": "DELETE",
		"scopes": ["basic"],
		"name": "Event Comment Unlike",
		"path": "\/2\/event_comment_like\/:id",
		"response_notes": "Returns an HTTP 200 response if delete was successful, 401 if unauthorized.",
		"examples": "",
		"group": "events"
	}, {
		"desc": "Api for listing likes of a given event comment",
		"param_notes": "At least one of the required parameters must be supplied with the request.",
		"params": {
			"*comment_id": "Return likes for a given comment_id"
		},
		"api_version": "2",
		"formats": ["json", "xml"],
		"http_method": "GET",
		"response": {
			"member": ["member who liked the comment", {
				"member_state": "Optional field",
				"member_city": "Optional field",
				"name": "Name of the member",
				"member_country": "Optional field",
				"photo": ["if available, the member's photo", {
					"photo_link": "URL for a standard size of the photo",
					"highres_link": "URL for the photo at its maximum size",
					"thumb_link": "URL for a thumbnail of the photo",
					"photo_id": "Photo ID"
				}],
				"member_id": "Member's ID"
			}],
			"created": "UTC creation time of the event, in milliseconds since the epoch",
			"event_comment_id": "ID of the comment liked"
		},
		"scopes": ["basic"],
		"name": "Comment Likes",
		"path": "\/2\/event_comment_likes",
		"orders": {
			"created": "Order by the time the member liked like comment (default: descending)"
		},
		"examples": "",
		"group": "events"
	}, {
		"desc": "This method returns comments on meetup photos. To post messages, see the corresponding write method",
		"param_notes": "At least one of the required parameters must be supplied by the request.",
		"params": {
			"*photo_id": "Return comments on these photos, separated by commas",
			"member_id": "Return comments for the given member_ids, separated by commas. The member ids must match up with one of the provided photo ids",
			"fields": "Request that additional fields (separated by commas) be included in the output."
		},
		"api_version": "2",
		"formats": ["json", "xml"],
		"http_method": "GET",
		"response": {
			"member": ["Author of comment", {
				"member_state": "Optional field",
				"member_city": "Optional field",
				"name": "Name of the member",
				"member_country": "Optional field",
				"member_id": "Member's ID"
			}],
			"member_photo": ["If the optional \"fields\" parameter contains \"member_photo\", the member photo associated with the comment", {
				"photo_link": "URL for the standard sized photo",
				"hires_link": "URL for the original sized photo",
				"thumb_link": "URL for the thumbnail sized photo",
				"photo_id": "ID of the photo"
			}],
			"created": " The time and date that the comment was posted, in milliseconds since the epoch",
			"photo_comment_id": "Unique identifier for this comment ",
			"comment": "Text of the comment that was posted",
			"photo_id": "Photo ID where the comment was posted"
		},
		"scopes": ["basic"],
		"name": "Photo Comments v2",
		"path": "\/2\/photo_comments",
		"orders": {
			"time": "Order by the time that each comment was posted",
			"name": "the name of the member"
		},
		"examples": "",
		"group": "photos"
	}, {
		"desc": "This method posts comments that appear below photos",
		"param_notes": "All of the required parameters must be supplied with the request, which must be an HTTP POST. The currently authenticated user must be a member of the group hosting the photo",
		"params": {
			"*photo_id": "The photo related to this comment.",
			"*comment": "The comment text"
		},
		"api_version": "2",
		"formats": ["json", "xml"],
		"http_method": "POST",
		"scopes": ["basic"],
		"name": "Photo Comment v2",
		"path": "\/2\/photo_comment",
		"response_notes": "If successful, this method responds with a \"201 Created\" status and a JSON or XML body consisting of the posted comment in the same fields as the response items of the Photo Comments method.",
		"group": "photos",
		"examples": "\nPost a comment to photo ID 1234.\n\n    curl -i \"https:\/\/api.meetup.com\/2\/photo_comment.xml\" -d \"event_id=1234&comment=hello+world&key=ABDE12456AB232445\"\n    "
	}, {
		"desc": "API method for accessing Meetup comments",
		"param_notes": "At least one of the required parameters must be supplied with the request.",
		"params": {
			"*event_id": "The ID of the event to fetch ratings data for",
			"member_id": "The ID of a member to filter ratings on"
		},
		"api_version": "2",
		"formats": ["json", "xml"],
		"http_method": "GET",
		"response": {
			"time": "The date\/time that the review was created",
			"group_id": "The ID of the group that the event belongs to",
			"event_id": "The string ID of the event",
			"rating": "Only present if the authenticated member is the reviewer; number of stars given",
			"member_name": "name of member leaving th review",
			"member_id": "id of the member leaving the review"
		},
		"scopes": ["basic"],
		"name": "Ratings v2",
		"path": "\/2\/event_ratings",
		"orders": {
			"time": "Order by the time that each rating was posted",
			"rating": "Order by the value for each rating posted"
		},
		"examples": "\nRatings information for a single event\n\n    https:\/\/api.meetup.com\/2\/event_ratings.json\/?event_id=1300571&key=ABDE12456AB2324445\n",
		"group": "events"
	}, {
		"response": {
			"time": "The time that the event was created",
			"rating_count": "The number of reviews posted for the event",
			"group_id": "The ID of the group",
			"event_id": "The string ID of the event",
			"rating": "The overall average rating of the event"
		},
		"http_method": "POST",
		"scopes": ["basic"],
		"desc": "This method allows members to posts rating for an event after it's occurred. Only permitted for members who rsvp'd \"yes\" or \"maybe\" to the event",
		"name": "Event Rating",
		"path": "\/2\/event_rating",
		"params": {
			"*rating": "The member's rating (either 1, 2, 3, 4, or 5)",
			"*event_id": "The ID of the event to fetch ratings data for",
			"attendee_count": "The number of attendees for the event (organizers\/assistant organizers\/co-organizers\/event organizers\/event hosts only)"
		},
		"group": "events",
		"examples": "\nPost a rating to event ID 1234.\n\n    curl -i \"https:\/\/api.meetup.com\/2\/event_rating.xml\" -d \"event_id=1234&rating=5&comment=hello+world&key=ABDE12456AB2324445\"\n    ",
		"api_version": "2",
		"formats": ["json", "xml"]
	}, {
		"desc": "This method returns checkins for an event. To post checkins, see [\/2\/checkin](\/meetup_api\/docs\/2\/checkin).",
		"param_notes": "At least one of the required parameter(s) must be supplied with the request.",
		"params": {
			"*member_id": "Return checkins for the given member_ids, separated by commas",
			"*group_id": "Return checkins in groups with these ID numbers, separated by commas",
			"*event_id": "Return checkins for these events, separated by commas"
		},
		"api_version": "2",
		"formats": ["json", "xml"],
		"http_method": "GET",
		"response": {
			"checkin_id": "Unique identifier for this checkin ",
			"time": "The time and date of the checkin, in milliseconds since the epoch",
			"lon": "Longitude reported, if any. Hidden from non-members of the group if the venue is hidden from non-members.",
			"group_id": "Group ID of the event",
			"event_id": "String ID of the event checked into",
			"comment": "Text of the checkin comment if one was supplied",
			"member_name": "Name of the member who checked in",
			"checker": ["Member who performed the checkin, if not the same as the one who checked in", {
				"member_state": "Optional field",
				"member_city": "Optional field",
				"name": "Name of the member",
				"member_country": "Optional field",
				"member_id": "Member's ID"
			}],
			"lat": "Latitude reported, if any. Hidden from non-members of the group if the venue is hidden from non-members.",
			"member_id": "Member who checked in"
		},
		"scopes": ["basic"],
		"name": "Checkins",
		"path": "\/2\/checkins",
		"orders": {
			"time": "the date and time of the checkin",
			"name": "the name of the member"
		},
		"response_notes": "For private groups, the authenticated user must be a member to see checkins.",
		"examples": "",
		"group": "deprecated",
		"prefer": false
	}, {
		"desc": "This method posts event checkins that can be retrieved by [\/2\/checkins](\/meetup_api\/docs\/2\/checkins). Event attendees may check in themselves and others in the group.",
		"param_notes": "All of the required parameters must be supplied with the request, which must be a standard POST",
		"params": {
			"attendee_member_id": "Supply this parameter only when the user is checking in someone else. The currently authenticated member will be recorded as the checker while the member referenced by this parameter will appear in the member_id and member_name response fields of the checkins method",
			"lat, lon": "Location reported by device performing checkin",
			"comment": "Comment to attach to the checkin. When checking in someone else, this request parameter is ignored.",
			"*event_id": "Event we're checking in to"
		},
		"api_version": "2",
		"formats": ["json", "xml"],
		"http_method": "POST",
		"response": {},
		"scopes": ["basic"],
		"errors": {
			"badevent": "The event id does not match a valid event",
			"nonmember": "The authenticated member is not a member of the group hosting the event"
		},
		"name": "Checkin v2",
		"path": "\/2\/checkin",
		"response_notes": "If successful, this method responds with a \"201 Created\" status and a json or XML body consisting of the posted checkin in the same fields as the response items of the [Checkins method](\/meetup_api\/docs\/2\/checkins\/#response).",
		"examples": "\nTo check in to an event with the comment \"hi\" and coordinates in Central Park, New York:\n\n    curl -i https:\/\/api.meetup.com\/2\/checkin -d \"event_id=<event id>&comment=hi&lat=40.783333&lon=-73.966667&key=<your key>\"\n\n",
		"group": "deprecated"
	}, {
		"desc": "This method returns photo albums associated with Meetup groups. To create albums, see the corresponding write method.",
		"param_notes": "At least one of the required parameter(s) must be supplied with the request.",
		"params": {
			"*photo_album_id": "Return albums with these IDs, separated by commas",
			"*group_id": "Return albums in groups with these ID, separated by commas",
			"*event_id": "Return photo albums for these event ids, separated by commas"
		},
		"api_version": "2",
		"formats": ["json", "xml"],
		"http_method": "GET",
		"response": {
			"title": "Photo album title",
			"album_photo": ["Selected photo from the album to display in listings", {
				"photo_link": "URL for a standard size of the photo",
				"highres_link": "URL for the photo at its maximum size",
				"thumb_link": "URL for a thumbnail the photo",
				"photo_id": "-"
			}],
			"updated": "Last updated time in milliseconds since the epoch",
			"created": "Created time in milliseconds since the epoch",
			"group_id": "ID of the group that created the album",
			"event_id": "Event ID if this is an event photo album",
			"photo_album_id": "Unique identifier of the album",
			"ordering": "If a custom ordering is defined, a list of photo IDs",
			"photo_count": "Number of photos in the album"
		},
		"scopes": ["basic"],
		"name": "Photo Albums",
		"path": "\/2\/photo_albums",
		"orders": {
			"time": "creation date and time",
			"title": "title of the album",
			"updated": "album updated field"
		},
		"examples": "",
		"group": "photos"
	}, {
		"desc": "This method returns photos by member, group, album, event, photo ID, or tagged member.",
		"param_notes": "At least one of the required parameter(s) must be supplied with the request.",
		"params": {
			"*member_id": "Uploaded by members with these IDs, separated by commas",
			"time": "Return photos uploaded within the given time range, defined by two times separated with a single comma. Each end of the range may be specified with relative dates, such as \"1m\" for one month from now, or by absolute time in milliseconds since the epoch. If an endpoint is omitted, the range is unbounded on that end. The default value is unbounded on both ends (though restricted to the search window described above).",
			"*photo_album_id": "Photo Album IDs, separated by commas",
			"*photo_id": "Photo IDs, separated by commas",
			"*group_id": "Group IDs, separated by commas",
			"*tagged": "Tagged with members with these IDs, separated by commas",
			"*event_id": "Event ids, separated by commas. These may contain alphanumeric autoscheduled event ids, only photos of reified events will be returned",
			"*group_urlname": "Group urlnames, separated by commas",
			"fields": "comma-delimited optional response properties such as member_country, member_city, member_state, and self"
		},
		"api_version": "2",
		"formats": ["json", "xml"],
		"http_method": "GET",
		"response": {
			"member": ["Member that uploaded the photo", {
				"member_state": "Optional field",
				"member_city": "Optional field",
				"name": "Name of the member",
				"member_country": "Optional field",
				"member_id": "Member's ID"
			}],
			"comment_count": "Optional fields parameter. When requested, this returns the number of comments made about this photo",
			"thumb_link": "URL for a thumbnail the photo",
			"caption": "Photo caption",
			"self": ["Optional field, contains details specific to the authorized user", {
				"role": "Member's role in group, if any: Organizer, Assistant Organizer, Event Organizer, etc.",
				"actions": "list of actions the current user may perform, potentially \"delete\""
			}],
			"site_link": "URL for photo in photo album on meetup.com, available when requested in the fields parameter",
			"member_photo": ["Optional member photo of the uploading member", {
				"photo_link": "URL for a standard size of the photo",
				"highres_link": "URL for the photo at its maximum size",
				"thumb_link": "URL for a thumbnail of the photo",
				"photo_id": "Photo ID"
			}],
			"photo_link": "URL for a standard size of the photo",
			"created": "Created time in milliseconds since the epoch",
			"updated": "Last updated time in milliseconds since the epoch",
			"highres_link": "URL for the photo at its maximum size",
			"photo_album": ["-", {
				"event": ["Extra event info returned when requested in the \"fields\" parameter", {
					"id": "String ID of the event",
					"time": "UTC start time of the event, in milliseconds since the epoch",
					"event_url": "URL of the event's page on meetup.com",
					"name": "Name of the event"
				}],
				"group_id": "ID of the group that created the album",
				"photo_album_id": "Unique identifier of the album",
				"event_id": "Event ID if this is an event photo album"
			}],
			"photo_id": "Unique identifier of the photo"
		},
		"scopes": ["basic"],
		"name": "Photos",
		"path": "\/2\/photos",
		"orders": {
			"time": "creation date and time"
		},
		"examples": "",
		"group": "photos"
	}, {
		"desc": "This method creates photo albums within a Meetup group",
		"param_notes": "All of the required parameters must be supplied with the request, which must be an HTTP POST. The currently authenticated user must be an organizer (main, assistant, or co-) of the specified group",
		"params": {
			"*title": " Title of the new album",
			"*group_id": "Group to create the album in"
		},
		"api_version": "2",
		"formats": ["json", "xml"],
		"http_method": "POST",
		"scopes": ["basic"],
		"name": "Photo Album2",
		"path": "\/2\/photo_album",
		"response_notes": "If successful, this method responds with a \"201 Created\" status and a json or XML body consisting of the album data in the same fields as the response items of the Photo Albums method.",
		"group": "photos",
		"examples": "\n    Create an album in group id 1234.\n\n    curl -i \"https:\/\/api.meetup.com\/2\/photo_album.xml\" -d \"group_id=1234&title=my+album&key=ABDE12456AB2324445\"\n    "
	}, {
		"desc": "Searches for public venues within a given geo space. To search for specific venues that your group has used, use the [Venues](\/meetup_api\/docs\/2\/venues) method",
		"param_notes": "At least one of the required parameter(s) must be supplied with the request. If you are not able to provide a relative location you may supply a group_urlname which this method will use to infer location from. You can perform prefix searching by appending a * character to your query",
		"params": {
			"*state": "For the US, a valid 2 character state code",
			"*lon": "A valid longitude, limits the returned venues to those within radius miles",
			"*city": "A valid city",
			"*zip": "A valid US zip code, limits the returned venues to those within radius miles",
			"*lat": "A valid latitude, limits the returned venues to those within radius miles",
			"*country": "A valid country code.",
			"radius": "Radius, in miles for geographic requests, default 25.0 -- maximum 100.0",
			"*text": "Venues that contain the given term or terms somewhere in their content. Separate terms with \" AND \" for venues that have combined terms. Append a trailing * to treat this as a prefix search",
			"*group_urlname": "Returns venues with location relative to the group associated with this urlname",
			"fields": "Request that additional fields (separated by commas) be included in the output"
		},
		"api_version": "2",
		"formats": ["json", "xml"],
		"http_method": "GET",
		"response": {
			"zip": "if US or Canada",
			"phone": "phone number of venue",
			"fax": "fax number of venue",
			"address_3": "line 3 of venue address",
			"address_1": "line 1 of venue address",
			"address_2": "line 2 of venue address",
			"venue_url": "URL of the venues's page on meetup.com",
			"id": "ID of the venue",
			"taglist": "Optional array of associated tagnames provided when a value of \"taglist\" is supplied with the \"fields\" request parameter",
			"distance": "Distance in miles from the search location, if one was specified",
			"rating_count": "The number of member ratings",
			"email": "email address of venue",
			"city, state, country": "City, County and if in US state of venue",
			"lat, lon": "coordinates of venue",
			"name": "Name of the venue",
			"rating": "The average member rating"
		},
		"scopes": ["basic"],
		"name": "OpenVenues",
		"path": "\/2\/open_venues",
		"orders": {
			"distance": "(default order) ordering is approximate and will not exactly match the values in the \"distance\" field.",
			"rating_count": "number of member ratings.",
			"rating": "average member rating"
		},
		"examples": "\nSearch for public venues near the zipcode 10021\n\n    https:\/\/api.meetup.com\/2\/open_venues\n        ?zip=10021\n        &key=ABDE12456AB2324445\n   \nSearch for the top 5 public venues near the zipcode 10021 with tagged with \"wifi\" and \"coffee\" with the highest rating\n\n    https:\/\/api.meetup.com\/2\/open_venues\n       ?zip=10021\n       &text=wifi and coffee\n       &page=5\n       &desc=true\n       &order=rating\n       &key=ABDE12456AB2324445\n\n    ",
		"group": "venues"
	}, {
		"desc": "Search for Meetup venues by one of your groups, events, or venue identifiers. For a full text search on public venues use [OpenVenues](\/meetup_api\/docs\/2\/open_venues).",
		"param_notes": "At least one of the required parameter(s) must be supplied with the request. You can use either group_urlname or group_id to filter by groups but not both.",
		"params": {
			"*venue_id": "multiple ids may be separated with commas",
			"*group_id": "multiple ids may be separated with commas",
			"*event_id": "multiple ids may be separated with commas",
			"*group_urlname": "path to group from meetup.com, no slashes",
			"fields": "Request that additional fields (separated by commas) be included in the output"
		},
		"api_version": "2",
		"formats": ["json", "xml"],
		"http_method": "GET",
		"response": {
			"zip": "if US or Canada",
			"phone": "phone number of venue",
			"fax": "fax number of venue",
			"address_3": "line 3 of venue address",
			"address_1": "line 1 of venue address",
			"address_2": "line 2 of venue address",
			"venue_url": "URL of the venues's page on meetup.com",
			"id": "ID of the venue",
			"taglist": "Optional array of associated tagnames provided when a value of \"taglist\" is supplied with the \"fields\" request parameter",
			"distance": "Distance in miles from the search location, if one was specified",
			"rating_count": "The number of member ratings",
			"email": "email address of venue",
			"city, state, country": "City, County and if in US state of venue",
			"lat, lon": "coordinates of venue",
			"name": "Name of the venue",
			"rating": "The average member rating"
		},
		"scopes": ["basic"],
		"name": "Venues",
		"path": "\/2\/venues",
		"orders": {
			"distance": "(default order) ordering is approximate and will not exactly match the values in the \"distance\" field.",
			"rating_count": "number of member ratings.",
			"rating": "average member rating"
		},
		"examples": "\n Get all unique venues used by your groups with urlnames group-a and group-b and include their tags\n\n    https:\/\/api.meetup.com\/2\/venues\n        ?group_urlname=group-a,group-b\n        &fields=taglist\n        &key=ABDE12456AB2324445\n    ",
		"group": "venues"
	}, {
		"desc": "API method for accessing meetup rsvps",
		"param_notes": "At least one of the required parameter(s) must be supplied with the request.",
		"params": {
			"*event_id": "Return members that RSVP'd to events with these ID numbers [separated by commas]"
		},
		"formats": ["json", "rss", "atom", "xml"],
		"http_method": "GET",
		"response": {
			"lon": "Longitude coordinates of the members reported city",
			"member_id ": "The member's id",
			"link": "URL to the member's profile page on meetup.com",
			"answers": "Answers to event survey questions provided when the member RSVP'd, only available to organizers and assistant organizers",
			"state": "US State the member has provided",
			"updated:": "Timestamps indicating when the RSVP was last updated",
			"event_id": "The Event id",
			"city": "City the member has provided",
			"country": "Country the member has provided",
			"id": "RSVP id",
			"response": "\"yes\", \"no\", \"maybe\", or \"waitlist\"",
			"created": "Timestamps indicating when the RSVP was first set",
			"name": "The member's name",
			"comment": "The message that the member provided when RSVP was made",
			"lat": "Latitude coordinates of the members reported city"
		},
		"scopes": ["basic"],
		"name": "Rsvps",
		"path": "\/rsvps",
		"orders": {
			"name": "the name of the attendee"
		},
		"examples": "\nReturn members who RSVP'd to event 437658\n\n    https:\/\/api.meetup.com\/rsvps.json\/?event_id=437658&key=ABDE12456AB2324445\n    ",
		"group": "deprecated",
		"prefer": "\/2\/rsvps"
	}, {
		"desc": "Creates a new Rsvp",
		"param_notes": "At least one of the required parameter(s) must be supplied with the request. The rsvp is recorded for the currently authenticated member account, unless a member_id is supplied. Member's RSVP'ing as themselves may supply answers to a Meetup event's survey questions by supplying answers as request parameters corresponding to question ids in the format __answer_{question_id}__. To discover available Meetup event survey questions, supply the [Events 2](\/meetup_api\/docs\/2\/events\/) method with the 'fields' parameter set to 'survey_questions'",
		"params": {
			"answer_{qid}": "Answers to event survey questions. Organizers and hosts my not edit or create answers on behalf of members",
			"*rsvp": "The RSVP setting - value must be either \"yes\". \"no\", \"waitlist\" or \"maybe\"",
			"guests": "Number of guests also coming to the event.",
			"*event_id": "The event that you are RSVP'ing to",
			"comments": "A comment to post along with the RSVP",
			"member_id": " Organizers and event hosts may RSVP on behalf of a member by specifying an ID here. As when editing RSVPs on the site, organizers may enter a \"yes\" for a member even if the event requires payment."
		},
		"formats": ["json", "xml"],
		"http_method": "POST",
		"scopes": ["basic"],
		"name": "RSVP",
		"path": "\/rsvp",
		"response_notes": "For this method, response data will only consist of either a success or failure message. If the RSVP was successful, the success message will also contain the event_id of the event that was just RSVP'd to",
		"prefer": "\/2\/rsvp",
		"group": "deprecated",
		"examples": "\n\nRSVP 'yes' to the event with id 12345.\n\n    curl https:\/\/api.meetup.com\/rsvp\/\n       -F 'event_id=12345'\n       -F 'rsvp=yes'\n       -F 'key=YOURKEY'\n\nRSVP 'yes' to the event with id 12345 answering survey questions.\n\nFirst get the survey questions for the target event\n\n    curl 'https:\/\/api.meetup.com\/2\/event\/12345\/?key=YOURKEY&fields=survey_questions'\n\nThen answer questions accordingly\n\n    curl https:\/\/api.meetup.com\/rsvp\/\n       -F 'event_id=12345'\n       -F 'rsvp=yes'\n       -F 'answer_123=answering question 123'\n       -F 'answer_456=answer question 456'\n       -F 'key=YOURKEY'\n    "
	}, {
		"desc": "Query for Event RSVPs by event",
		"param_notes": "At least one of the required parameter(s) must be supplied with the request.",
		"params": {
			"rsvp": "Filters response on RSVP status. \"yes\" if member RSVP'd yes otherwise \"no\"",
			"*event_id": "Multiple alphanumeric ids may be separated with commas",
			"fields": "Parameter for requesting optional response properties, set to other_services for a list of third party services"
		},
		"api_version": "2",
		"formats": ["json", "rss", "atom", "xml"],
		"http_method": "GET",
		"response": {
			"member": ["Member who RSVP'd", {
				"member_city": "Optional field",
				"member_state": "Optional field",
				"bio": "Optional field returned when appending \"member_bio\" to the \"fields\" parameter. Contains the member's group \"introduction\"",
				"name": "Name of the member",
				"member_country": "Optional field",
				"other_services": ["Third-party services associated with the member account", {
					"[service-name]": ["This element is flickr, tumblr, twitter, or linkedin", {
						"identifier": "identifier for the service, a username or URL"
					}]
				}],
				"member_id": "Member's ID"
			}],
			"host": "Optional field, `true` if RSVP is for an event host",
			"answers": "Answers to event survey questions provided when the member RSVP'd, only available to organizers and assistant organizers",
			"mtime": "Last modified time of the RSVP, in milliseconds since the epoch.",
			"guests": "Number of guests the RSVP'd member will be bringing",
			"venue": ["Venue, if selected and not hidden", {
				"id": "Venue id",
				"zip": "ZIP code if, venue is in US or Canada",
				"phone": "Phone number of venue",
				"address_3": "Line 3 of venue address",
				"repinned": "true if the editor of the event altered the original venues pin location, false otherwise",
				"city, state, country": "City, Country and if in US state of venue",
				"lat, lon": "Geographic coordinates of venue",
				"name": "Venue name",
				"address_1": "Line 1 of venue address",
				"address_2": "Line 2 of venue address"
			}],
			"pay_status": "The RSVPer's payment status if the event has an associated fee. Returned only for organizers when 'pay_status' is requested with the fields parameter. This may be one of 'none', 'paid', 'partially_paid', 'payment_pending', 'echeck_pending', 'refund_pending', 'partially_refunded', 'refunded'.",
			"response": "\"yes\", \"no\", \"waitlist\" or \"yes_pending_payment\" which is the response returned after RSVPing \"yes\" to an event that requires payment.",
			"member_photo": ["The RSVPing member's photo if available", {
				"photo_link": "URL for a standard size of the photo",
				"highres_link": "URL for the photo at its maximum size",
				"thumb_link": "URL for a thumbnail of the photo",
				"photo_id": "Photo ID"
			}],
			"watching": "if the current member choose to watch and event for open spot notifications, their response will be waitlist and watching will be true",
			"created": "Creation time of the RSVP, in milliseconds since the epoch.",
			"event": ["The event associated with the RSVP", {
				"id": "String ID of the event",
				"time": "UTC start time of the event, in milliseconds since the epoch",
				"event_url": "URL of the event's page on meetup.com",
				"name": "Name of the event"
			}],
			"rsvp_id": "The RSVP id",
			"group": ["Group hosting the event", {
				"id": "Group id",
				"group_lat": "Approximate group latitude",
				"name": "Group name",
				"group_lon": "Approximate group longitude",
				"join_mode": "\"open\", \"approval\", or \"closed\"",
				"urlname": "Group URL name",
				"who": "What the group calls its members"
			}],
			"comments": "The message that the member provided when RSVP was made"
		},
		"scopes": ["basic"],
		"name": "RSVPs v2",
		"path": "\/2\/rsvps",
		"orders": {
			"event": "the id or time of the event",
			"social": "social connections of the authenticated member",
			"name": "the name of the attendee"
		},
		"response_notes": "If the RSVP is for a host of a repeating event that hasn't been RSVP'd to by others, the __id__ in the response will be __-1__ and the __mtime__ will be that of the recurring event",
		"examples": "\nGet RSVPs for event 789 ordering by event then the RSVP'd member's name\n\n    http:\/\/api.meetup.com\/2\/rsvps?key=YOUR_KEY&event_id=789&order=name\n    ",
		"group": "rsvps"
	}, {
		"desc": "Creates a new Rsvp",
		"param_notes": "At least one of the required parameter(s) must be supplied with the request. The rsvp is recorded for the currently authenticated member account, unless a member_id is supplied. Member's RSVP'ing as themselves may supply answers to a Meetup event's survey questions by supplying answers as request parameters corresponding to question ids in the format __answer_{question_id}__. To discover available Meetup event survey questions, supply the [Events 2](\/meetup_api\/docs\/2\/events\/) method with the 'fields' parameter set to 'survey_questions'\n\nIf the event requires payment you are required to send an \"agree_to_refund\" parameter set to the true or false. This represents the authorized members agreement to understanding the event's refund policy.\n",
		"tag": "create",
		"params": {
			"agree_to_refund": "For events with fees, the authorized member must agree to the event's refund policy. This must be set to either true or false",
			"answer_{qid}": "Answers to event survey questions. Organizers and hosts my not edit or create answers on behalf of members",
			"*rsvp": "The RSVP setting - value must be either \"yes\". \"no\", \"waitlist\" or \"maybe\"",
			"opt_to_pay": "For events with fees, the authorized member may opt to pay as part of the RSVP request. This may be set to true or false",
			"guests": "Number of guests also coming to the event.",
			"*event_id": "The event that you are RSVP'ing to",
			"comments": "A comment to post along with the RSVP",
			"member_id": " Organizers and event hosts may RSVP on behalf of a member by specifying an ID here. As when editing RSVPs on the site, organizers may enter a \"yes\" for a member even if the event requires payment."
		},
		"api_version": "2",
		"formats": ["json", "xml"],
		"http_method": "POST",
		"response": {
			"member": ["Member who RSVP'd", {
				"member_city": "Optional field",
				"member_state": "Optional field",
				"bio": "Optional field returned when appending \"member_bio\" to the \"fields\" parameter. Contains the member's group \"introduction\"",
				"name": "Name of the member",
				"member_country": "Optional field",
				"other_services": ["Third-party services associated with the member account", {
					"[service-name]": ["This element is flickr, tumblr, twitter, or linkedin", {
						"identifier": "identifier for the service, a username or URL"
					}]
				}],
				"member_id": "Member's ID"
			}],
			"host": "Optional field, `true` if RSVP is for an event host",
			"tallies": ["The current set of counts for RSVPs", {
				"yes": "Number of yes rsvps",
				"maybe": "Number of maybe rsvps",
				"no": "Number of no rsvps"
			}],
			"mtime": "Last modified time of the RSVP, in milliseconds since the epoch.",
			"answers": "Answers to event survey questions provided when the member RSVP'd, only available to organizers and assistant organizers",
			"guests": "Number of guests the RSVP'd member will be bringing",
			"venue": ["Venue, if selected and not hidden", {
				"id": "Venue id",
				"zip": "ZIP code if, venue is in US or Canada",
				"phone": "Phone number of venue",
				"address_3": "Line 3 of venue address",
				"repinned": "true if the editor of the event altered the original venues pin location, false otherwise",
				"city, state, country": "City, Country and if in US state of venue",
				"lat, lon": "Geographic coordinates of venue",
				"name": "Venue name",
				"address_1": "Line 1 of venue address",
				"address_2": "Line 2 of venue address"
			}],
			"pay_status": "The RSVPer's payment status if the event has an associated fee. Returned only for organizers when 'pay_status' is requested with the fields parameter. This may be one of 'none', 'paid', 'partially_paid', 'payment_pending', 'echeck_pending', 'refund_pending', 'partially_refunded', 'refunded'.",
			"response": "\"yes\", \"no\", \"waitlist\" or \"yes_pending_payment\" which is the response returned after RSVPing \"yes\" to an event that requires payment.",
			"payment_redirect": "If the event RSVP'd to requires online payment and a yes response was accepted, this field will contain a payment url you should redirect the authenticated member to in order to complete the online payment",
			"member_photo": ["Rsvping Member's photo", {
				"photo_link": "URL for a standard size of the photo",
				"highres_link": "URL for the photo at its maximum size",
				"thumb_link": "URL for a thumbnail of the photo",
				"photo_id": "Photo ID"
			}],
			"created": "Creation time of the RSVP, in milliseconds since the epoch.",
			"watching": "if the current member choose to watch and event for open spot notifications, their response will be waitlist and watching will be true",
			"event": ["The event associated with the RSVP", {
				"id": "String ID of the event",
				"time": "UTC start time of the event, in milliseconds since the epoch",
				"event_url": "URL of the event's page on meetup.com",
				"name": "Name of the event"
			}],
			"rsvp_id": "The RSVP id",
			"group": ["Group hosting the event", {
				"id": "Group id",
				"group_lat": "Approximate group latitude",
				"name": "Group name",
				"group_lon": "Approximate group longitude",
				"join_mode": "\"open\", \"approval\", or \"closed\"",
				"urlname": "Group URL name",
				"who": "What the group calls its members"
			}],
			"comments": "The message that the member provided when RSVP was made"
		},
		"scopes": ["basic"],
		"name": "RSVP Create",
		"path": "\/2\/rsvp",
		"response_notes": "If successful, this method returns a 201 Created response with a Location header containing the [RSVP Get](\/meetup_api\/docs\/2\/rsvp\/#get) method for this event. 401 Unauthorized is returned if the currently authenticated member can not create Meetups in the specified group.\n\nIn cases where a member succesfully RSVP's yes to one of these events, the response will be returned as an HTTP 202 Accepted status, representing that the payment processing has not yet been completed. A payment_redirect property will be append to the response containing the value of the step you should take to submit the payment online for the event.\n\nIf a validation of Event and RSVP state occurs you may wish to inspect the response body for one of these the following error \"codes\".\n\n'dues_required': You must pay the group's member dues on the full site before you can RSVP for this event\n\n'event_past': This event has already passed\n\n'invalid_event': Invalid event\n\n'invalid_guest_num': Invalid number or guests\n\n'invalid_response': Invalid RSVP response\n\n'payment_required': Payment required to RSVP\n\n'refund_agreement': Member must agree to refund policy\n\n'rsvp_error': Error RSVPing to event\n\n'rsvper_not_authorized': You need to be an organizer or an event host to RSVP this member\n\n'too_few_spots': There are not enough spots for your rsvp\n\n'too_many_guests': You have specified too many guests",
		"examples": "\nRSVP 'yes' to the event with id 12345.\n\n    curl https:\/\/api.meetup.com\/2\/rsvp\/\n       -F 'event_id=12345'\n       -F 'rsvp=yes'\n       -F 'key=YOURKEY'\n\nRSVP 'yes' to the event with id 12345 answering survey questions.\n\nFirst get the survey questions for the target event\n\n    curl 'https:\/\/api.meetup.com\/2\/event\/12345\/?key=YOURKEY&fields=survey_questions'\n\nThen answer questions accordingly\n\n    curl https:\/\/api.meetup.com\/2\/rsvp\/\n       -F 'event_id=12345'\n       -F 'rsvp=yes'\n       -F 'answer_123=answering question 123'\n       -F 'answer_456=answer question 456'\n       -F 'key=YOURKEY'\n    ",
		"group": "rsvps"
	}, {
		"desc": "Retrieve a single RSVP",
		"param_notes": "Only authorization parameters are needed.",
		"tag": "get",
		"params": {
			"fields": "Request that additional fields (separated by commas) be included in the output"
		},
		"api_version": "2",
		"doc_path": "\/2\/rsvp",
		"formats": ["json", "xml"],
		"http_method": "GET",
		"response": {
			"member": ["Member who RSVP'd", {
				"member_city": "Optional field",
				"member_state": "Optional field",
				"bio": "Optional field returned when appending \"member_bio\" to the \"fields\" parameter. Contains the member's group \"introduction\"",
				"name": "Name of the member",
				"member_country": "Optional field",
				"other_services": ["Third-party services associated with the member account", {
					"[service-name]": ["This element is flickr, tumblr, twitter, or linkedin", {
						"identifier": "identifier for the service, a username or URL"
					}]
				}],
				"member_id": "Member's ID"
			}],
			"host": "Optional field, `true` if RSVP is for an event host",
			"answers": "Answers to event survey questions provided when the member RSVP'd, only available to organizers and assistant organizers",
			"mtime": "Last modified time of the RSVP, in milliseconds since the epoch.",
			"guests": "Number of guests the RSVP'd member will be bringing",
			"venue": ["Venue, if selected and not hidden", {
				"id": "Venue id",
				"zip": "ZIP code if, venue is in US or Canada",
				"phone": "Phone number of venue",
				"address_3": "Line 3 of venue address",
				"repinned": "true if the editor of the event altered the original venues pin location, false otherwise",
				"city, state, country": "City, Country and if in US state of venue",
				"lat, lon": "Geographic coordinates of venue",
				"name": "Venue name",
				"address_1": "Line 1 of venue address",
				"address_2": "Line 2 of venue address"
			}],
			"pay_status": "The RSVPer's payment status if the event has an associated fee. Returned only for organizers when 'pay_status' is requested with the fields parameter. This may be one of 'none', 'paid', 'partially_paid', 'payment_pending', 'echeck_pending', 'refund_pending', 'partially_refunded', 'refunded'.",
			"response": "\"yes\", \"no\", \"waitlist\" or \"yes_pending_payment\" which is the response returned after RSVPing \"yes\" to an event that requires payment.",
			"member_photo": ["The RSVPing member's photo if available", {
				"photo_link": "URL for a standard size of the photo",
				"highres_link": "URL for the photo at its maximum size",
				"thumb_link": "URL for a thumbnail of the photo",
				"photo_id": "Photo ID"
			}],
			"watching": "if the current member choose to watch and event for open spot notifications, their response will be waitlist and watching will be true",
			"created": "Creation time of the RSVP, in milliseconds since the epoch.",
			"event": ["The event associated with the RSVP", {
				"id": "String ID of the event",
				"time": "UTC start time of the event, in milliseconds since the epoch",
				"event_url": "URL of the event's page on meetup.com",
				"name": "Name of the event"
			}],
			"rsvp_id": "The RSVP id",
			"group": ["Group hosting the event", {
				"id": "Group id",
				"group_lat": "Approximate group latitude",
				"name": "Group name",
				"group_lon": "Approximate group longitude",
				"join_mode": "\"open\", \"approval\", or \"closed\"",
				"urlname": "Group URL name",
				"who": "What the group calls its members"
			}],
			"comments": "The message that the member provided when RSVP was made"
		},
		"scopes": ["basic"],
		"name": "RSVP Get",
		"path": "\/2\/rsvp\/:id",
		"examples": "",
		"group": "rsvps"
	}, {
		"desc": "Uploads a new Meetup Group photo. To change other Group settings use the [Group Edit](\/meetup_api\/docs\/:urlname\/#edit) endpoint",
		"param_notes": "The request must be a POST of content-type multipart\/form-data. The supplied photo will be added to the provided groups general photo album. If authenticating with OAuth, no parameters in the multipart form data should be included in the signature base string. You must be an organizer of the group in order to load a photo.",
		"tag": "create",
		"params": {
			"*photo": "The photo, encoded as multipart\/form-data. The maximum file size allowed is 10MB",
			"await": "If true, this ensures a response will not be returned until the upload is accessible",
			"*group_id": "Group ID for the target group. This may be used as an alternative to group_urlname",
			"*group_urlname": "Group urlname. This may be used as an alternative to group_id",
			"main": "Set to 'true' to have this photo become the group's main photo. Set it to 'false' otherwise. Defaults to true"
		},
		"api_version": "2",
		"formats": ["json", "xml"],
		"http_method": "POST",
		"response": {
			"title": "Request Completed",
			"group_photo_id": "Unique identifier of this photo ",
			"photo_url": "Link to the uploaded group photo (same as in the Location header)."
		},
		"scopes": ["basic"],
		"name": "Group Photo Upload",
		"path": "\/2\/group_photo",
		"response_notes": "When successful, this method responds with a status of \"201 Created\" and a Location header with the uploaded photo's URL. The response body contains the following elements in JSON or XML. Upon recieving the response, some photos may not be immediately accesible. If this is desirable, use the \"await\" request parameter",
		"examples": "Upload a new primary group photo with curl\n\n    curl \"http:\/\/api.meetup.com\/2\/group_photo\" \\\n       -F \"photo=@\/path\/to\/photo.jpg\" \\\n       -F \"group_urlname=MY_GROUP\" \\\n       -F \"key=API_KEY\"\n    ",
		"group": "groups"
	}, {
		"desc": "Uploads a photo to be associated with a Member",
		"param_notes": "The request must be a POST of content-type multipart\/form-data. The supplied photo will be added to the currently authenticated user's member profile. If authenticating with OAuth, no parameters in the multipart form data should be included in the signature base string.",
		"tag": "create",
		"params": {
			"*photo": "The photo, encoded as multipart\/form-data. The maximum file size allowed is 10MB",
			"sync_photo": "When set to true, this parameter will sync all of the group profile photos for the member with the provided photo_id",
			"await": "If true, this ensures a response will not be returned until the upload is accessible",
			"sync_matching_photo": "When set to true and main is set to true, this will replace all group profile photos matching the current photo with the provided replacement",
			"main": "Set to \"true\" to have this photo become the member's main profile photo. Otherwise, it will become the main photo only when none other is selected"
		},
		"api_version": "2",
		"formats": ["json", "xml"],
		"http_method": "POST",
		"response": {
			"title": "Request Completed",
			"photo_url": "Link to the uploaded member photo (same as in the Location header).",
			"member_photo_id": "Unique identifier of this photo "
		},
		"scopes": ["basic"],
		"name": "Member Photo Upload",
		"path": "\/2\/member_photo",
		"response_notes": "When successful, this method responds with a status of \"201 Created\" and a Location header with the uploaded photo's URL. The response body contains the following elements in JSON or XML. Upon receiving the response, some photos may not be immediately accessible. If this is desirable, use the \"await\" request parameter",
		"examples": "",
		"group": "members"
	}, {
		"desc": "Uploads a photo for a given event",
		"param_notes": "A photo album or event ID must be supplied with the request, which must be a POST of content-type `multipart\/form-data`. The currently authenticated user must be a member of the group that is hosting the event. Parameters other than photo may be passed in as a query string or within the posted content. If authenticating with OAuth, no parameters in the multipart form data should be included in the signature base string",
		"tag": "create",
		"params": {
			"*photo": "The photo, encoded as multipart\/form-data. The maximum file size allowed is 10MB",
			"await": "If true, this ensures a response will not be returned until the upload is accessible",
			"*photo_album_id": "Identifier of an existing photo album, which may be an event or group album",
			"caption": "Caption for the photo",
			"*event_id": "Identifier of an event. If there is no album for this event, one will be created."
		},
		"api_version": "2",
		"formats": ["json", "xml"],
		"http_method": "POST",
		"response": {
			"member": ["Member that uploaded the photo", {
				"name": "Name of member",
				"member_id": "Identifier of member"
			}],
			"album_id": "Identifier of the photo's  album",
			"site_link": "URL for photo in photo album on meetup.com",
			"title": "Request Completed",
			"event_photo_id": "Unique identifier of this photo",
			"created": "Created time in milliseconds since the epoch",
			"updated": "Last updated time in milliseconds since the epoch",
			"photo_url": "Link to the uploaded event photo (same as in the Location header)."
		},
		"scopes": ["basic"],
		"name": "Event Photo Upload",
		"path": "\/2\/photo",
		"response_notes": "When successful, this method responds with a status of \"201 Created\" and a Location header with the uploaded photo's URL. The response body contains the following elements in JSON or XML. Upon recieving the response, some photos may not be immediately accesible. If this is desirable, use the \"await\" request parameter",
		"examples": "",
		"group": "photos"
	}, {
		"desc": "API method for accessing meetup groups",
		"param_notes": "At least one of the required parameter(s) must be supplied with the request. Answers to questions are expected to follow the naming convention: answer_{question_id}=myanswer when joining.",
		"params": {
			"*member_id": "A member id number, limits results set to only those groups that the member specified by this id is currently a member of (excludes private groups, unless the member_id is the same as that of the member making the request)",
			"*topic": "Only return groups in the specified topic [one topic allowed]",
			"*lat,lon": "A valid latitude and longitude, limits the returned groups to those within radius miles",
			"*topic, groupnum": "Return the group with this topic and number",
			"visibility": "Set to \"members\" or \"public\" to restrict to groups of a particular visibility",
			"*id": "Only return groups with the specified ID's [separate ID numbers with commas]",
			"*zip": "A valid US zip code, limits the returned groups to those within radius miles.",
			"radius": "Radius, in miles for geographic requests, default 25 -- maximum 100",
			"*group_urlname": "Return the group with this custom url path (e.g., the string \"teaneck-archaeologists\" would refer to the group located at http:\/\/www.meetup.com\/teaneck-archaeologists)",
			"*country, city, state": "A valid country code, city and for the US, State. limits the returned groups to those within radius miles",
			"fields": "Set to \"short_link\" to include shortened group URLs in response items. Set to \"join_info\" to get a list of questions and requirements used when joining the group."
		},
		"formats": ["json", "rss", "atom", "xml", "kml", "gmap"],
		"http_method": "GET",
		"response": {
			"zip": "The zip code where this group is located",
			"country, city, state": "Country, City, (and for the US, State) where this group is located",
			"lon": "Longitude coordinates of group location",
			"join_info": ["Optional field, lists any questions requested when joining and required fields", {
				"questions": ["List of questions asked by organizer", {
					"id": "Unique identifier for the questions.",
					"question": "The text of the question"
				}],
				"intro_required": "\"1\" if required, \"0\" otherwise",
				"questions_required": "\"1\" if required, \"0\" otherwise"
			}],
			"visibility": "Set to \"members\" or \"public\". Only authenticated group members can retrieve event and membership details for private groups",
			"photo_url": "Url of the group's photo",
			"organizerName": "Name of the group's organizer",
			"group_urlname": "The group's url name",
			"link": "Link to the groups page",
			"short_link": "short version of the group's link",
			"who": "what the group calls its members",
			"id": "The groups's id",
			"topics": ["Topics related to this group", {
				"id": "Topic ID",
				"urlkey": "Unique keyword used to identify this topic",
				"name": "Topic name"
			}],
			"name ": "The groups's name",
			"organizerProfileURL": "Profile url of group organizer",
			"updated": "The last date and time that the group was updated",
			"created": "The date the group was created",
			"description": "Description of the group",
			"rating": "Group rating",
			"daysleft": "If this group is in need of an organizer, number of days until it expires (otherwise blank)",
			"lat": "Latitude coordinates of group location",
			"members": "The number of members in the group"
		},
		"scopes": ["basic"],
		"name": "Groups",
		"path": "\/groups",
		"orders": {
			"location": "group location, country, state [if present], city",
			"name": "the name of the group",
			"ctime": "group creation time [newest first]",
			"members": "number of members [largest first]"
		},
		"examples": "\nGet a list of all groups near Williamsburg, Brooklyn ordered oldest first, in xml format.\n\n    https:\/\/api.meetup.com\/groups.xml\/?zip=11211&order=ctime&desc=true&key=ABDE12456AB2324445\n\nList all the pug groups in Reno, Nevada return json.\n\n    https:\/\/api.meetup.com\/groups.json\/?&topic=pug&country=us&state=nv&city=reno&key=ABDE12456AB2324445\n    ",
		"group": "deprecated",
		"prefer": "\/2\/groups"
	}, {
		"desc": "Uploads a new Event photo",
		"param_notes": "A photo album or event ID must be supplied with the request, which must be a POST of content-type `multipart\/form-data`. The currently authenticated user must be a member of the group that is hosting the event. Parameters other than photo may be passed in as a query string or within the posted content. If authenticating with OAuth, no parameters in the multipart form data should be included in the signature base string",
		"params": {
			"*photo": "The photo, encoded as multipart\/form-data. The maxiumum file size allowed is __10MB__",
			"*photo_album_id": "Identifier of an existing photo album, which may be an event or group album",
			"caption": "Caption for the photo",
			"*event_id": "Identifier of an event. If there is no album for this event, one will be created."
		},
		"formats": ["json", "xml"],
		"http_method": "POST",
		"response": {
			"album_id": "Id of the album posted to",
			"title": "completed message",
			"details": "photo id: and the Id of the photo",
			"photo_id": "Id of the photo created"
		},
		"scopes": ["basic"],
		"name": "Photo Upload",
		"path": "\/photo",
		"response_notes": "For this method, response data will only consist of either a success or failure message. If the upload was successful, the following properties will be returned",
		"examples": "",
		"group": "deprecated",
		"prefer": "2\/photo\/#create"
	}, {
		"response": {
			"id": "Unique identifier for the feed item.",
			"group_name": "Name of the group where the action took place.",
			"title": "A short description of the action that occurred.",
			"photo_url": "Link to the profile photo of the member represented (except in the case of photo actions, where the photo URL is used instead).",
			"link": "URL to the content represented in the action.",
			"group_id": "Unique ID of the group where the action took place.",
			"published": "Date and time of when the action occurred.",
			"member_name": "Member who performed the action.",
			"member_id": "ID of member who performed the action.",
			"item_type": "Type of activity that occurred. One of: new_member, chapter_greeting, photo_upload, new_discussion, new_reply, new_rsvp, edit_rsvp, photo_tag, photo_comment, new_checkin"
		},
		"http_method": "GET",
		"scopes": ["basic"],
		"desc": "API method for retrieving the activity feed for a member's groups",
		"name": "ActivityFeed",
		"path": "\/activity",
		"params": {
			"page_start": "Starting timestamp for item to return.",
			"member_id": "Returns activity from this member's groups. Must be authenticated as this member"
		},
		"group": "feeds",
		"examples": "\nReturn latest group activities for member 1234.\n\n    https:\/\/api.meetup.com\/activity.json\/?member_id=1234&key=ABDE12456AB2324445\n    ",
		"formats": ["json", "rss", "atom", "xml"]
	}, {
		"scopes": ["basic"],
		"path": "\/widget",
		"examples": ""
	}, {
		"path": "\/widget_query",
		"examples": ""
	}, {
		"desc": "",
		"param_notes": "All parameters are optional, will update the container when provided. You must be authenticated as the founder, and this method requires an HTTP POST.",
		"tag": "edit",
		"params": {
			"twitter_urlname": "account name, no slash or @",
			"link_name": "name of link",
			"udf_{varname}": "modify or add user defined values",
			"description": "description of the event",
			"link": "must be a URL",
			"name": "renames the container if the requested name is available",
			"facebook_urlname": "path name without slashes",
			"fields": "Request that additional fields (separated by commas) be included in the output."
		},
		"api_version": "2",
		"doc_path": "\/ew\/container",
		"formats": ["json", "xml"],
		"http_method": "POST",
		"scopes": ["basic"],
		"name": "Container Edit",
		"path": "\/ew\/container\/:id",
		"response_notes": "If successful, this method returns a 200 OK response. The content body is the same as that returned by Container Get.",
		"examples": "",
		"group": "everywhere containers"
	}, {
		"desc": "",
		"param_notes": "Normal authorization parameters are required. The output may be adjusted as normal with format, as well as a fields specifier",
		"tag": "get",
		"params": {
			"fields": "Request that additional fields (separated by commas) be included in the output"
		},
		"api_version": "2",
		"doc_path": "\/ew\/container",
		"formats": ["json", "xml"],
		"http_method": "GET",
		"response": {
			"twitter_urlname": "Twitter account name associated with this container",
			"member_count": "Count of unique members who have rsvp'd to a meetup in this container. Only included if requested in the fields parameter.",
			"meetup_count": "Count of upcoming and pending meetups in this container. Only included if requested in the fields parameter.",
			"link_name": "Name of the resource at link",
			"link": "URL associated with this container, usually off-site",
			"theme": ["Custom appearance for this container, if any", {
				"pageback_color": "HTML hex color code",
				"banner_height": "Banner height in pixels. All banners are 960 pixels wide.",
				"link_color": "color used for links",
				"button_color": "color used for buttons",
				"banner_link": "URL of the page banner, if any",
				"boxback_color": "color used for boxback"
			}],
			"past_meetup_count": "Count of past meetups in this container. Only included if requested in the fields parameter.",
			"countries": "List of two-letter country codes where meetups have been scheduled in this container. Only included if requested in the fields parameter.",
			"facebook_urlname": "Facebook page associated with this container",
			"id": "The ID of the container",
			"udf_{varname}": "Any User defined fields specified in the fields parameter",
			"updated": "Container updated time, in milliseconds since the epoch",
			"created": "Container created time, in milliseconds since the epoch",
			"description": "Container description",
			"name": "The name of the container",
			"meetup_url": " User-facing URL for this container on Meetup",
			"urlname": "URL path to the container, as in http:\/\/www.meetup.com\/<urlname> (no slashes)",
			"founder": ["Founder for this container", {
				"member_state": "if requested through the fields parameter",
				"member_city": "if requested through the fields parameter",
				"name": "name of member",
				"member_country": "if requested through the fields parameter",
				"member_id": "id of member"
			}]
		},
		"scopes": ["basic"],
		"name": "Container Get",
		"path": "\/ew\/container\/:id",
		"examples": "",
		"group": "everywhere containers"
	}, {
		"desc": "",
		"param_notes": "The required name parameter must be supplied with the request. This method requires an HTTP POST.",
		"tag": "create",
		"params": {
			"twitter_urlname": "account name, no slash or @",
			"link_name": "Name of link",
			"udf_{varname}": "user defined values",
			"description": "Description of this container",
			"link": "must be a URL",
			"*name": "Name of this container",
			"facebook_urlname": "path name without slashes",
			"fields": "Request that additional fields (separated by commas) be included in the output."
		},
		"api_version": "2",
		"doc_path": "\/ew\/container",
		"formats": ["json", "xml"],
		"http_method": "POST",
		"scopes": ["basic"],
		"name": "Container Create",
		"path": "\/ew\/container",
		"response_notes": "If successful, this method returns a 200 OK response. The content body is the same as that returned by Container Get.",
		"examples": "",
		"group": "everywhere containers"
	}, {
		"desc": "",
		"param_notes": "No parameters are required or considered other than for authorization and format.",
		"tag": "alert_get",
		"params": {
			"updates": "Alert for updates to events, \"true\" or \"false\"",
			"rsvps": "Alert for each rsvp, \"true\" or \"false\"",
			"comments": "Alert for each comment, \"true\" or \"false\""
		},
		"api_version": "2",
		"doc_path": "\/ew\/container",
		"formats": ["json", "xml"],
		"http_method": "GET",
		"scopes": ["basic"],
		"name": "Alerts Get",
		"path": "\/ew\/container\/:id\/alerts",
		"response_notes": "Response item includes properties for the authenticated user's alerts by category. These are enabled at the container level, but sent only for events the user has rsvpd to. If the authenticated user has not subscribed to alerts for the container, a 404 response is returned.",
		"examples": "",
		"group": "everywhere containers"
	}, {
		"desc": "",
		"param_notes": "All parameters are optional, updates alerts for the authenticated user. This method requires an HTTP POST.",
		"tag": "alert_edit",
		"params": {
			"updates": "Alert for updates to events, \"true\" or \"false\"",
			"rsvps": "Alert for each rsvp, \"true\" or \"false\"",
			"comments": "Alert for each comment, \"true\" or \"false\""
		},
		"formats": ["json", "xml"],
		"doc_path": "\/ew\/container",
		"http_method": "POST",
		"name": "Alerts Edit",
		"path": "\/ew\/container\/:id\/alerts",
		"response_notes": "If successful, this method returns a 200 OK response. The content body is the same as that returned by Alerts Get. If a 404 response is returned, the user has not subscribed to any alerts for this container and should rsvp to an event first.",
		"group": "everywhere containers",
		"examples": ""
	}, {
		"desc": "",
		"param_notes": "At least one of the required parameter(s) must be supplied with the request.",
		"params": {
			"*link": "External URL associated with the container",
			"*urlname": "URL path to the container, as in http:\/\/www.meetup.com\/<urlname> (no slashes)",
			"udf_{varname}": "Query by any user defined parameter",
			"*container_id": "ID of the container",
			"fields": "Request that additional fields (separated by commas) be included in the output."
		},
		"api_version": "2",
		"doc_path": "\/ew\/containers",
		"formats": ["json", "xml"],
		"http_method": "GET",
		"scopes": ["basic"],
		"name": "Container Query",
		"path": "\/ew\/containers",
		"response_notes": "Each item in the results list for a JSON or XML request will contain the fields listed in Container Get.",
		"examples": "",
		"group": "everywhere containers"
	}, {
		"param_notes": "at least one of the required parameter(s) must be supplied with the request.",
		"params": {
			"*urlname": "Up to five URL paths, separated by commas",
			"udf_{varname}": "User defined values",
			"*community_urlname": "Up to five URL paths, separated by commas. \"urlname\" or \"container_id\" is also required",
			"*zip": "A US zip or Canadian postal code",
			"*container_id": "One or more IDs, separated by commas",
			"*lat, lon": "Coordinates to search near.",
			"*community_id": "One or more IDs, separated by commas",
			"*country, city, state": "Country code and city name. For the US, state code is also required",
			"fields": "Request that additional fields (separated by commas) be included in the output."
		},
		"api_version": "2",
		"formats": ["json", "xml", "kml"],
		"doc_path": "\/ew\/communities",
		"http_method": "GET",
		"scopes": ["basic"],
		"name": "Communities Query",
		"path": "\/ew\/communities",
		"response_notes": "Each item in the results list for a JSON or XML request will contain the fields listed in [Community Get](\/meetup_api\/docs\/ew\/community\/#community_get)",
		"group": "everywhere communities",
		"examples": ""
	}, {
		"param_notes": "All parameters are optional, will update the community when provided. This method requires an HTTP POST.",
		"tag": "community_edit",
		"params": {
			"zip": "Zip or postal code",
			"lat, lon": "Latitude and longitude coordinates of the community",
			"name": "Name of the community",
			"state": "State or province code",
			"city": "Community city name",
			"country": "Community country code"
		},
		"api_version": "2",
		"doc_path": "\/ew\/community",
		"formats": ["json", "xml"],
		"http_method": "POST",
		"scopes": ["basic"],
		"name": "Community Edit",
		"path": "\/ew\/community\/:id",
		"response_notes": "If successful, this method returns a 200 OK response. The content body is the same as that returned by [Community Get](#community_get).",
		"examples": "",
		"group": "everywhere communities"
	}, {
		"param_notes": "Normal authorization parameters are required. The output may be adjusted as normal with format, as well as a fields specifier:",
		"tag": "community_get",
		"params": {
			"fields": "Request that additional fields (separated by commas) be included in the output."
		},
		"api_version": "2",
		"doc_path": "\/ew\/community",
		"formats": ["json", "xml"],
		"http_method": "GET",
		"response": {
			"zip": "Zip or postal code",
			"meetup_count": "Count of upcoming and pending Meetups in this community. Only included if requested in the fields parameter.",
			"state": "State or province code",
			"past_meetup_count": "Count of past Meetups in this community. Only included if requested in the fields parameter.",
			"city": "Community city name",
			"country": "Community country code",
			"id": "The ID of the community",
			"created": "Community created time, in milliseconds since the epoch",
			"updated": "Community updated time, in milliseconds since the epoch",
			"udf_{varname}": "Any User defined fields specified in the fields parameter",
			"container": ["Container for this community", {
				"id": "-",
				"name": "-",
				"urlname": "-"
			}],
			"name": "Name of the community",
			"lat, lon": "Latitude and longitude coordinates of the community",
			"meetup_url": "User-facing URL for this community on Meetup",
			"urlname": "URL path to the community, as in http:\/\/www.meetup.com\/{container_urlname}\/{urlname} (no slashes)"
		},
		"scopes": ["basic"],
		"name": "Community Get",
		"path": "\/ew\/community\/:id",
		"examples": "",
		"group": "everywhere communities"
	}, {
		"desc": "For container owners. API method for removing a community. All events of the community will be removed as well.",
		"param_notes": "No parameters are required or considered other than for authorization and format. This method requires an HTTP DELETE",
		"tag": "delete",
		"params": {},
		"api_version": "2",
		"doc_path": "\/ew\/community",
		"formats": ["json", "xml"],
		"http_method": "DELETE",
		"scopes": ["basic"],
		"name": "Community Delete",
		"path": "\/ew\/community\/:id",
		"response_notes": "If successful, this method returns a 200 OK response. The content body includes a success message.",
		"examples": "",
		"group": "everywhere communities"
	}, {
		"param_notes": "An identifier for the container is required as well *at least one* location parameter set. Other location details may be filled out automatically. This method requires an HTTP POST.",
		"tag": "community_create",
		"params": {
			"*urlname": "May serve as the required identifier of the container",
			"name": "Name of the community",
			"*zip": "A US zip or Canadian postal code. May serve as the required location parameter set",
			"*container_id": "May serve as the required identifier of the container",
			"*lat, lon": "May serve as the required location parameter set.",
			"*country, city, state": "May serve as the required location parameter set. Country code and city name. For the US, a state code is also required"
		},
		"api_version": "2",
		"doc_path": "\/ew\/community",
		"formats": ["json", "xml"],
		"http_method": "POST",
		"scopes": ["basic"],
		"name": "Community Create",
		"path": "\/ew\/community",
		"response_notes": "If successful, this method returns a 201 Created response with a Location header containing the [Community Get](#community_get) method for this community. The content body is the same as that returned by Community Get.",
		"examples": "",
		"group": "everywhere communities"
	}, {
		"param_notes": "No parameters are required. If no parameters are provided, then all communities followed by the authenticated user will be included in the response.",
		"params": {
			"udf_{varname}": "User defined fields",
			"community_id": "One or more IDs, separated by commas",
			"urlname": "Up to five URL paths, separated by commas",
			"container_id": "One or more IDs, separated by commas",
			"fields": "Request that additional fields (separated by commas) be included in the output."
		},
		"api_version": "2",
		"formats": ["json", "xml"],
		"doc_path": "\/ew\/follows",
		"http_method": "GET",
		"scopes": ["basic"],
		"name": "Community Follows Query",
		"path": "\/ew\/follows",
		"response_notes": "Each item in the results list for a JSON or XML request will contain the fields listed in [Community Follow Get](\/meetup_api\/docs\/ew\/follow\/#follow_get)",
		"group": "everywhere communities",
		"examples": ""
	}, {
		"param_notes": "This method requires at least one of the following parameters: \"container_id\", \"community_id\", \"urlname\" or \"community_urlname\"",
		"params": {
			"*urlname": "Up to five container URL names, separated by commas",
			"udf_{varname}": "User defined fields",
			"*community_urlname": "One or more community URL names, separated by commas",
			"*container_id": "One or more container IDs, separated by commas",
			"*community_id": "One or more community IDs, separated by commas",
			"fields": "Request that additional fields (separated by commas) be included in the output."
		},
		"api_version": "2",
		"formats": ["json", "xml"],
		"doc_path": "\/ew\/followers",
		"http_method": "GET",
		"scopes": ["basic"],
		"name": "Community Followers",
		"path": "\/ew\/followers",
		"response_notes": "Each item in the results list for a JSON or XML request will contain the fields listed in [Community Follow Get](\/meetup_api\/docs\/ew\/follow\/#follow_get).",
		"group": "everywhere communities",
		"examples": ""
	}, {
		"param_notes": "at least one of the required parameter(s) must be supplied with the request. The follow is always applied for the current authenticated member. This method requires an HTTP POST.",
		"tag": "follow_create",
		"params": {
			"udf_{varname}": "user defined values",
			"*community_id": "ID of the community to follow.",
			"fields": "Request that additional fields (separated by commas) be included in the output."
		},
		"api_version": "2",
		"doc_path": "\/ew\/follow",
		"formats": ["json", "xml"],
		"http_method": "POST",
		"scopes": ["basic"],
		"name": "Community Follow Create",
		"path": "\/ew\/follow",
		"response_notes": "If successful, this method returns a 201 Created response with a Location header containing the [Community Follow Get](#follow_get) method for this event. The content body is the same as that returned by Community Follow Get",
		"examples": "",
		"group": "everywhere communities"
	}, {
		"param_notes": "No parameters are required other than for authorization and format.",
		"tag": "follow_get",
		"params": {
			"fields": "Request that additional fields (separated by commas) be included in the output."
		},
		"api_version": "2",
		"doc_path": "\/ew\/follow",
		"formats": ["json", "xml"],
		"http_method": "GET",
		"response": {
			"member": ["Member following community", {
				"member_state": "If requested through the \"fields\" parameter, the member's state",
				"member_city": "If requested through the \"fields\" parameter, the member's city",
				"name": "Member name",
				"member_country": "If requested through the \"fields\" parameter, the member's country",
				"member_id": "Member ID"
			}],
			"id": "The ID of the community follow",
			"created": "created time, in milliseconds since the epoch",
			"udf_{varname}": "User defined \"fields\" specified in the fields parameter",
			"status": "\"member\" or \"helper\", if member has helped plan an event in the corresponding community",
			"container": ["Container for this follow", {
				"id": "ID of container",
				"name": "Name of container",
				"urlname": "URL param of container"
			}],
			"community": ["Community for this follow", {
				"id": "ID of community",
				"name": "Name of community",
				"urlname": "URL param of community"
			}]
		},
		"scopes": ["basic"],
		"name": "Community Follow Get",
		"path": "\/ew\/follow\/:id",
		"examples": "",
		"group": "everywhere communities"
	}, {
		"param_notes": "No parameters are required or considered other than for authorization and format. This method requires an HTTP DELETE.",
		"tag": "unfollow",
		"api_version": "2",
		"formats": ["json", "xml"],
		"doc_path": "\/ew\/follow",
		"http_method": "DELETE",
		"scopes": ["basic"],
		"name": "Community Unfollow",
		"path": "\/ew\/follow\/:id",
		"response_notes": "If successful, this method returns a 200 OK response. The content body includes a success message.",
		"group": "everywhere communities",
		"examples": "Only supports DELETE"
	}, {
		"desc": "",
		"param_notes": "An identifier for the community is required as well <em>at least one<\/em> location parameter set. Other location details may be filled out automatically. This method requires an HTTP POST. If you are not the founder of this container you will automatically be rsvp'd for the event",
		"tag": "create",
		"params": {
			"venue_name": "Name of the place where the event will happen",
			"link": "Link associated with the event. Displayed on the event page, and users are prompted to follow this link after indicating interest.",
			"*urlname, community_urlname": "Together, may serve as the required identifier of the event community",
			"address1": "street address; specify an empty string if you want to prevent this from being inferred from other parameters",
			"local_time": "Alternative to the time  parameter for applications that can not easily calculate an event's UTC time. If you know the wall-clock time and location for an event but do not know its UTC offset, you can supply a local_time and Meetup will apply the appropriate offset. The format for this parameter is milliseconds since the epoch as if the event occurred in a UTC zone.",
			"time": "event start time in milliseconds since the epoch. If the container has a default time value it will be used when no time is supplied, otherwise the event will be created without a time.",
			"short_description": "short description of the event",
			"udf_{varname}": "user defined values",
			"description": "description of the event",
			"*zip": "A US zip or Canadian postal code. May serve as the required location parameter set.",
			"*lat, lon": "May serve as the required location parameter set.",
			"*community_id": "May serve as the required identifier of the event community",
			"*country, city": "May serve as the required location parameter set. Country and city. For the US, state is also required",
			"fields": "Request that additional fields (separated by commas) be included in the output."
		},
		"api_version": "2",
		"doc_path": "\/ew\/event",
		"formats": ["json", "xml"],
		"http_method": "POST",
		"scopes": ["basic"],
		"name": "Event Create",
		"path": "\/ew\/event",
		"response_notes": "If successful, this method returns a 201 Created response with a Location header containing the Event Get method for this event. The content body is the same as that returned by [Event Get](#get).",
		"examples": "",
		"group": "everywhere events"
	}, {
		"desc": "",
		"param_notes": "All parameters are optional, will update the event when provided. This method requires an HTTP POST.",
		"tag": "edit",
		"params": {
			"zip": "Zip or postal code.",
			"country, city, state": "location information",
			"venue_name": "Name of the place where the event will happen",
			"link": "Link associated with the event. Displayed on the event page, and users are prompted to follow this link after indicating interest.",
			"address1": "street address; specify an empty string if you want to prevent this from being inferred from other parameters",
			"local_time": "Alternative to the time parameter for applications that can not easily calculate an event's UTC time. If you know the wall-clock time and location for an event but do not know its UTC offset, you can supply a local_time and Meetup will apply the appropriate offset. The format for this parameter is milliseconds since the epoch as if the event occurred in a UTC zone.",
			"time": "event start time in milliseconds since the epoch",
			"short_description": "description of the event",
			"udf_{varname}": "modify or add user defined values",
			"description": "description of the event",
			"lat, lon": "Latitude and Longitude coordinates of event",
			"fields": "Request that additional fields (separated by commas) be included in the output."
		},
		"api_version": "2",
		"doc_path": "\/ew\/event",
		"formats": ["json", "xml"],
		"http_method": "POST",
		"scopes": ["basic"],
		"name": "Event Edit",
		"path": "\/ew\/event\/:id",
		"response_notes": "If successful, this method returns a 200 OK response. The content body is the same as that returned by [Event Get](#get).",
		"examples": "",
		"group": "everywhere events"
	}, {
		"desc": "",
		"param_notes": "Normal authorization parameters are required. The output may be adjusted as normal with format, as well as a fields specifier",
		"tag": "get",
		"params": {
			"fields": "Request that additional fields (separated by commas) be included in the output."
		},
		"api_version": "2",
		"doc_path": "\/ew\/event",
		"formats": ["json", "xml"],
		"http_method": "GET",
		"response": {
			"zip": "Zip or postal code",
			"status": "\"past\", \"pending\" (no date), or \"upcoming\"",
			"venue_name": "Name of the place where the event will happen",
			"link": "Link associated with the event. Displayed on the event page, and users are prompted to follow this link after indicating interest.",
			"state": "State or province",
			"community": ["Community for this event", {
				"id": "-",
				"name": "-",
				"urlname": "-"
			}],
			"address1": "The street address, if assigned",
			"city": "Event city",
			"helpers": ["Helpers who planned this event, if any", {
				"member_state": "if requested through the fields parameter",
				"member_city": "if requested through the fields parameter",
				"name": "name of the planner",
				"member_country": "if requested through the fields parameter",
				"member_id": "member id of the planner"
			}],
			"country": "Event country",
			"id": "The ID of the event",
			"time": "Start time of the event in milliseconds since the epoch, if set",
			"short_description": "Event short description.",
			"updated": "Event updated time, in milliseconds since the epoch",
			"udf_{varname}": "Any User defined fields specified in the fields parameter",
			"created": "Event created time, in milliseconds since the epoch",
			"container": ["Container for this event", {
				"id": "ID of the container",
				"name": "name of the container",
				"urlname": "url name of the container"
			}],
			"description": "Event description.",
			"rsvp_count": "Current number of rsvps, included only if requested with the fields parameter.",
			"lat, lon": "Latitude and longitude coordinates of the event",
			"meetup_url": "User-facing URL for this event on Meetup"
		},
		"scopes": ["basic"],
		"name": "Event Get",
		"path": "\/ew\/event\/:id",
		"examples": "",
		"group": "everywhere events"
	}, {
		"desc": "",
		"param_notes": "At least one of the required parameter(s) must be supplied with the request.\n\nDate Formatting: Parameters for dates can be specified in absolute or relative terms. Absolute dates are specified in numbers only: `MMDDYYYY`. Relative dates are specified in days `d`, weeks `w`, or months `m` before or after today. Tomorrow is \"1d\", yesterday is \"-1d\"; three weeks from now is \"3w\", and six months ago is \"-6m\". These can be used with after and before to define a time window in a static request that advances with the actual date.\n",
		"params": {
			"zip": "A US zip or Canadian postal code",
			"status": "Return events matching one of the given status values, separated by commas. Possible statuses are \"pending\", \"upcoming\", and \"past\". The default status parameter is \"past,pending,upcoming\".",
			"before": "Return events scheduled before the specified date, formatted as described below",
			"*event_id": "ID of an event",
			"country, city": "Country and city. For the US, state is also required",
			"after": "Return events scheduled after the specified date, formatted as described below",
			"*urlname": "Up to five URL paths, separated by commas",
			"community_urlname": "Up to fine urlpaths, separated by commas.",
			"udf_{varname}": "user defined values",
			"lat, lon": "Coordinates to search near.",
			"*container_id": "One or more IDs, separated by commas",
			"*community_id": "One or more IDs, separated by commas",
			"fields": "Request that additional fields (separated by commas) be included in the output."
		},
		"api_version": "2",
		"doc_path": "\/ew\/events",
		"formats": ["json", "xml", "kml"],
		"http_method": "GET",
		"scopes": ["basic"],
		"name": "Event Query",
		"path": "\/ew\/events",
		"orders": {
			"time": "Event date and time"
		},
		"response_notes": "Each item in the results list for a JSON or XML request will contain the fields listed in [Event Get](\/meetup_api\/docs\/ew\/event#get).",
		"examples": "",
		"group": "everywhere events"
	}, {
		"desc": "For container owners. API method for accessing events seeded to communities.",
		"param_notes": "At least one of the required parameter(s) must be supplied with the request.",
		"params": {
			"*urlname": "Up to five URL paths, separated by commas",
			"community_urlname": "Up to fine urlpaths, separated by commas.",
			"udf_{varname}": "user defined values",
			"status": "Return event seeds matching one of the given status values, separated by commas. Possible statuses are \"pending\", \"active\", or \"archived\". The default status parameter is \"active,archived\".",
			"*seed_id": "ID of an event",
			"*container_id": "One or more IDs, separated by commas",
			"fields": "Request that additional fields (separated by commas) be included in the output."
		},
		"api_version": "2",
		"doc_path": "\/ew\/seeds",
		"formats": ["json", "xml"],
		"http_method": "GET",
		"scopes": ["basic"],
		"name": "Event Seeds Query",
		"path": "\/ew\/seeds",
		"orders": {
			"short_description": "Event seed short description"
		},
		"response_notes": "Each item in the results list for a JSON or XML request will contain the fields listed in Event Seed Get.",
		"examples": "",
		"group": "everywhere seed events"
	}, {
		"desc": "For container owners. API method for editing events seeded to communities.",
		"param_notes": "All parameters are optional, will update the event when provided. This method requires an HTTP POST.",
		"tag": "edit",
		"params": {
			"short_description": "short description of the event seed",
			"udf_{varname}": "modify or add user defined values",
			"description": "description of the event seed",
			"fields": "Request that additional fields (separated by commas) be included in the output."
		},
		"api_version": "2",
		"doc_path": "\/ew\/seed",
		"formats": ["json", "xml"],
		"http_method": "POST",
		"scopes": ["basic"],
		"name": "Event Seed Edit",
		"path": "\/ew\/seed\/:id",
		"response_notes": "If successful, this method returns a 200 OK response. The content body is the same as that returned by Event Seed Get.",
		"examples": "",
		"group": "everywhere event seeds"
	}, {
		"desc": "For container owners. API method for querying an event seeded to communities.",
		"param_notes": "Normal authorization parameters are required. The output may be adjusted as normal with format, as well as a fields specifier",
		"tag": "get",
		"params": {
			"fields": "Request that additional fields (separated by commas) be included in the output."
		},
		"api_version": "2",
		"doc_path": "\/ew\/seed",
		"formats": ["json", "xml"],
		"http_method": "GET",
		"response": {
			"local_time": "local time for event to happen globally in milliseconds since the epoch",
			"id": "The ID of the event seed",
			"short_description": "short description of the event seed",
			"status": "\"pending\", \"active\", or \"archived\"",
			"udf_{varname}": "Any User defined fields specified in the fields parameter",
			"updated": "Event updated time, in milliseconds since the epoch",
			"created": "Event created time, in milliseconds since the epoch",
			"container": ["Container for this event seed", {
				"id": "ID of the container",
				"name": "name of the container",
				"urlname": "url name of the container"
			}],
			"description": "description of the event seed"
		},
		"scopes": ["basic"],
		"name": "Event Seed Get",
		"path": "\/ew\/seed\/:id",
		"examples": "",
		"group": "everywhere event seeds"
	}, {
		"desc": "For container owners. API method for removing all events seeded to communities.",
		"param_notes": "No parameters are required or considered other than for authorization and format. This method requires an HTTP DELETE",
		"tag": "delete",
		"params": {},
		"api_version": "2",
		"doc_path": "\/ew\/seed",
		"formats": ["json", "xml"],
		"http_method": "DELETE",
		"scopes": ["basic"],
		"name": "Event Seed Delete",
		"path": "\/ew\/seed\/:id",
		"response_notes": "If successful, this method returns a 200 OK response. The content body includes a success message.",
		"examples": "",
		"group": "everywhere event seeds"
	}, {
		"desc": "For container owners. API method for creating an event to seed to all communities.",
		"param_notes": "An identifier for the container is required as well as the short_description. This method requires an HTTP POST.",
		"tag": "create",
		"params": {
			"*short_description": "short description of the event seed",
			"*urlname": "May serve as the required identifier of the event seed container",
			"udf_{varname}": "user defined values",
			"*local_time": "local time for event to happen globally in milliseconds since the epoch",
			"*description": "description of the event seed",
			"*container_id": "May serve as the required identifier of the event seed container",
			"fields": "Request that additional fields (separated by commas) be included in the output."
		},
		"api_version": "2",
		"doc_path": "\/ew\/seed",
		"formats": ["json", "xml"],
		"http_method": "POST",
		"scopes": ["basic"],
		"name": "Event Seed Create",
		"path": "\/ew\/seed",
		"response_notes": "If successful, this method returns a 201 Created response with a Location header containing the Event Seed Get method for this event. The content body is the same as that returned by Event Seed Get.",
		"examples": "",
		"group": "everywhere event seeds"
	}, {
		"desc": "",
		"param_notes": "At least one of the required  parameter(s) must be supplied with the request. The RSVP is always applied for the current authenticated member. This method requires an HTTP POST.",
		"tag": "create",
		"params": {
			"udf_{varname}": "User defined fields",
			"*event_id": "ID of an event",
			"fields": "Request that additional fields (separated by commas) be included in the output."
		},
		"api_version": "2",
		"doc_path": "\/ew\/rsvp",
		"formats": ["json", "xml"],
		"http_method": "POST",
		"scopes": ["basic"],
		"name": "RSVP Create",
		"path": "\/ew\/rsvp",
		"response_notes": "If successful, this method returns a 201 Created response with a Location header containing the RSVP Get method for this event. The content body is the same as that returned by RSVP Get.",
		"examples": "",
		"group": "everywhere rsvps"
	}, {
		"desc": "",
		"param_notes": "No parameters are required or considered other than for authorization and format. This method requires an HTTP DELETE",
		"tag": "delete",
		"params": {},
		"doc_path": "\/ew\/rsvp",
		"formats": ["json", "xml"],
		"http_method": "DELETE",
		"scopes": ["basic"],
		"name": "RSVP Delete",
		"path": "\/ew\/rsvp\/:id",
		"response_notes": "If successful, this method returns a 200 OK response. The content body includes a success message.",
		"examples": "",
		"group": "everywhere rsvps"
	}, {
		"desc": "",
		"param_notes": "No parameters are required other than for authorization and format.",
		"tag": "get",
		"params": {
			"fields": "Request that additional fields (separated by commas) be included in the output."
		},
		"doc_path": "\/ew\/rsvp",
		"formats": ["json", "xml"],
		"http_method": "GET",
		"response": {
			"id": "The ID of the rsvp",
			"member": ["Member that rsvp'd", {
				"member_state": "Optional field",
				"member_city": "Optional field",
				"name": "Name of the member",
				"member_country": "Optional field",
				"member_id": "Member's ID"
			}],
			"member_photo": ["Photo info, if available, for the member", {
				"photo_link": "URL for a standard size of the photo",
				"highres_link": "URL for the photo at its maximum size",
				"thumb_link": "URL for a thumbnail of the photo",
				"photo_id": "Photo ID"
			}],
			"udf_{varname}": "User defined fields specified in the fields parameter",
			"created": "rsvp created time, in milliseconds since the epoch",
			"event_id": "The ID of the event"
		},
		"scopes": ["basic"],
		"name": "RSVP Get",
		"path": "\/ew\/rsvp\/:id",
		"examples": "",
		"group": "everywhere rsvps"
	}, {
		"desc": "",
		"param_notes": "At least one of the required parameter(s) must be supplied with the request, and multiple query values may be separated with commas. ",
		"params": {
			"*member_id": "ID of a member",
			"udf_{varname}": "User defined fields",
			"*event_id": "ID of an event",
			"fields": "Request that additional fields (separated by commas) be included in the output."
		},
		"api_version": "2",
		"doc_path": "\/ew\/rsvps",
		"formats": ["json", "xml"],
		"http_method": "GET",
		"scopes": ["basic"],
		"name": "RSVPs Query",
		"path": "\/ew\/rsvps",
		"response_notes": "Each item in the results list for a JSON or XML request will contain the fields listed in RSVP Get.",
		"examples": "",
		"group": "everywhere rsvps"
	}, {
		"desc": "",
		"param_notes": "At least one of the required  parameter(s) must be supplied with the request. The comment is always entered for the current authenticated member. This method requires an HTTP POST.",
		"tag": "create",
		"params": {
			"udf_{varname}": "user defined values",
			"*comment": "comment content",
			"*event_id": "ID of the event to comment on",
			"parent_id": "ID of parent, if threaded",
			"fields": "Request that additional fields (separated by commas) be included in the output."
		},
		"api_version": "2",
		"formats": ["json", "xml"],
		"doc_path": "\/ew\/comment",
		"http_method": "POST",
		"scopes": ["basic"],
		"name": "Comment Create",
		"path": "\/ew\/comment",
		"orders": {
			"time": "Comment date and time"
		},
		"response_notes": "If successful, this method returns a 201 Created response with a Location header containing the Comment Get method for this event. The content body is the same as that returned by Comment Get.",
		"examples": "",
		"group": "everywhere comments"
	}, {
		"desc": "",
		"param_notes": "No parameters are required or considered other than for authorization and format. This method requires an HTTP DELETE.",
		"tag": "delete",
		"api_version": "2",
		"doc_path": "\/ew\/comment",
		"formats": ["json", "xml"],
		"http_method": "DELETE",
		"scopes": ["basic"],
		"name": "Comment Delete",
		"path": "\/ew\/comment\/:id",
		"response_notes": "If successful, this method returns a 200 OK response. The content body includes a success message.",
		"examples": "",
		"group": "everywhere comments"
	}, {
		"desc": "",
		"param_notes": "No parameters are required other than for authorization and format.",
		"tag": "get",
		"params": {
			"fields": "Request that additional fields (separated by commas) be included in the output."
		},
		"api_version": "2",
		"doc_path": "\/ew\/comments",
		"formats": ["json", "xml"],
		"http_method": "GET",
		"response": {
			"member": ["Member that commented", {
				"member_state": "if requested through the fields parameter",
				"member_city": "if requested through the fields parameter",
				"name": "name of member",
				"member_country": "if requested through the fields parameter",
				"member_id": "ID of member"
			}],
			"id": "ID of the comment",
			"created": "comment created time, in milliseconds since the epoch",
			"udf_{varname}": "User defined fields specified in the fields parameter",
			"event_id": "ID of the event",
			"comment": "content of the comment",
			"parent_id": "ID of the partent comment, if threaded"
		},
		"scopes": ["basic"],
		"name": "Comment Get",
		"path": "\/ew\/comment\/:id",
		"examples": "",
		"group": "everywhere comments"
	}, {
		"desc": "",
		"param_notes": "At least one of the required parameter(s) must be supplied with the request, and multiple query values may be separated with commas.",
		"params": {
			"event_status": "Status may be \"upcoming\", \"past\" or both separated by a comma. The default is \"upcoming\" only",
			"*urlname": "one or more container urlnames",
			"*member_id": "one or more member IDs",
			"*parent_comment_id": "ID of a parent comment, to find its children",
			"community_urlname": "up to five URL paths",
			"udf_{varname}": "User defined fields",
			"*container_id": "one or more container IDs",
			"*event_id": "one or more event IDs",
			"*community_id": "one or more community IDs",
			"*comment_id": "one or more comment IDs",
			"fields": "Request that additional fields (separated by commas) be included in the output."
		},
		"api_version": "2",
		"doc_path": "\/ew\/comments",
		"formats": ["json", "xml"],
		"http_method": "GET",
		"scopes": ["basic"],
		"name": "Comment Query",
		"path": "\/ew\/comments",
		"orders": {
			"time": "Comment date and time"
		},
		"response_notes": "Each item in the results list for a JSON or XML request will contain the fields listed in Comment Get.",
		"examples": "",
		"group": "everywhere comments"
	}, {
		"http_method": "GET",
		"scopes": ["public"],
		"desc": "oEmbed implementation",
		"param_notes": "\nThis method does not require authentication. It requires only a url parameter and responds according to the [OEmbed specification](http:\/\/www.oembed.com\/). Any of the following base URLs may refer to embeddable content:\n\n* http:\/\/www.meetup.com\/\n* http:\/\/meetup.com\/\n* http:\/\/meetu.ps\/\n\nAn optional __maxwidth__ parameter may be provided.\n",
		"name": "oEmbed",
		"path": "\/oembed",
		"response_notes": "\nReturns the `rich` type of ombed resources defined in [section 2](http:\/\/www.oembed.com\/#section2) of the oEmbed specification in json format.\n",
		"params": {
			"maxwidth": "maximum width to display",
			"*url": "url of resource to be embedded"
		},
		"group": "oembed",
		"examples": "\nReturn an embedable representation of a the ny-scala group\n\n    http:\/\/api.meetup.com\/oembed?url=http:\/\/www.meetup.com\/ny-tech\n[Try it out](\/meetup_api\/console\/?path=\/oembed&url=http:\/\/www.meetup.com\/ny-tech#browser)\n",
		"formats": ["json"]
	}, {
		"desc": "\nThis [long-polling](http:\/\/en.wikipedia.org\/wiki\/Comet_%28programming%29#Script_tag_long_polling) \nstream can be easily consumed using JavaScript in any modern browser. RSVP\nnotifications are received when they happen, or as soon as your script finishes handling its\nlast notification.",
		"host": "stream",
		"param_notes": "These parameters are set automatically by Meetup's [must.js](https:\/\/github.com\/meetup\/must.js#readme) client.",
		"tag": "polling",
		"params": {
			"since_mtime": "Should be supplied for all but the first polling request, so that any missed notifications are can be sent in an immediate response",
			"*callback": "Name of a function to be called with an array of RSVP notification objects. If this \nparameter is not supplied, the chunked stream is joined instead.",
			"event_id": "Limit notifications to a specific event id. Use alphanumeric ids for repeating events.",
			"since_count": "Request that some number of recent messages be sent immediately, if available. May not be specified in the same request as since_mtime."
		},
		"formats": ["json"],
		"doc_path": "\/stream\/2\/rsvps",
		"http_method": "GET",
		"response": {
			"member": ["Member who RSVP'd", {
				"member_name": "Full name given",
				"other_services": "e.g. {\"twitter\": {\"identifier\": \"MeetupAPI\"}}",
				"photo": "Thumbnail URL for member photo if one exists",
				"member_id": "Unique numeric id"
			}],
			"response": "\"yes\" or \"no\"",
			"event": ["Event for the RSVP", {
				"time": "Event time if set in milliseconds since the epoch",
				"event_url": "URL to the full event page",
				"event_id": "Unique alphanumeric identifier",
				"event_name": "Name of the event"
			}],
			"mtime": "Last modified time of this RSVP, in milliseconds since the epoch",
			"guests": "Number of guests the member is bringing",
			"rsvp_id": "Unique numeric identifier",
			"group": ["Group hosting the event", {
				"group_state": "two-letter code of group's home state, if in US or CA",
				"group_name": "-",
				"group_city": "Group's home city",
				"group_lat": "Latitude of group's approximate location",
				"group_urlname": "Unique portion of group's URL, no slashes",
				"group_id": "Numeric identifier of the group",
				"group_country": "two-letter code of group's home country",
				"group_topics": ["Topics associated with this group", {
					"urlkey": "Unique keyword",
					"topic_name": "Longer name"
				}],
				"group_lon": "Longitude of group's approximate location"
			}],
			"venue": ["Venue, if public", {
				"lon": "Longitude of the venue",
				"venue_name": "-",
				"venue_id": "Unique numeric identifier",
				"lat": "Latitude of the venue"
			}]
		},
		"errors": {
			"connection_limit": "the client IP has exceeded its maximum number of connections"
		},
		"name": "Long-Polling RSVP Stream",
		"path": "\/2\/rsvps",
		"response_notes": "RSVP upload notification objects include these properties. This method's response is \nan array of zero or more of these, while Meetup's JS client calls your callback function\nwith exactly one object.",
		"group": "streams",
		"examples": "\nInstall the Meetup stream client with [bower](http:\/\/bower.io\/)\n\n    $ bower install must\n\nThe HTML page draws a table of RSVPs as they are received.\n\n    <html>\n      <head>\n        <script src=\"components\/jquery\/jquery.min.js\"><\/script>\n        <script src=\"components\/must\/must.js\"><\/script>\n        <script>\n          must.Rsvps(function(rsvp) {\n            $('#rsvps').prepend(\n              '<tr><td>' + rsvp.member.member_name +\n              '<\/td><td>' + rsvp.group.group_name +\n              '<\/td><td>' + (rsvp.event.time ? new Date(rsvp.event.time) : '') +\n              '<\/td><td>' + rsvp.group.group_city + ', ' + rsvp.group.group_country +\n              '<\/td><\/tr>'\n            );\n          });\n        <\/script>\n      <\/head>\n      <body>\n        <table><thead>\n          <tr><th>Who<\/th><th>What<\/th><th>When<\/th><th>Where<\/th><\/tr>\n        <\/thead><tbody id=\"rsvps\">\n        <\/tbody><\/table>\n      <\/body>\n    <\/html>\n\nSee **map** in our [stream github project](https:\/\/github.com\/meetup\/stream) \nfor a more advanced example.\n"
	}, {
		"host": "stream",
		"desc": "\nFor browsers that support it, [WebSockets](http:\/\/dev.w3.org\/html5\/websockets\/) is a more\nefficient alternative to the long-polling stream. This is a **push only** endpoint and will discard\nany messages received from the client after the socket is open.\n\nBecause browser support for WebSockets is limited, we recommend that you consume this stream\nthrough the [must.js](https:\/\/github.com\/meetup\/must.js#readme) client, which can fallback to long-polling.\n    ",
		"param_notes": "The full URL for this method is **`ws:\/\/stream.meetup.com\/2\/rsvps`**",
		"tag": "websockets",
		"params": {
			"since_mtime": "Return recent RSVPs with an mtime greater than the supplied time, in milliseconds since the epoch",
			"event_id": "Limit notifications to a specific event id. Use alphanumeric ids for repeating events.",
			"since_count": "Request that some number of recent messages be sent immediately, if available. May not be specified in the same request as since_mtime."
		},
		"formats": ["json"],
		"doc_path": "\/stream\/2\/rsvps",
		"http_method": "WS",
		"errors": {
			"connection_limit": "the client IP has exceeded its maximum number of connections"
		},
		"name": "WebSockets RSVP Stream",
		"path": "\/2\/rsvps",
		"response_notes": "This stream includes the same JSON notification objects as its long-polling\n[counterpart](#polling), one per WebSocket frame.",
		"examples": "The [long-polling](#polling) stream examples will automatically use WebSockets, if available.",
		"group": "streams"
	}, {
		"host": "stream",
		"desc": "\nLive HTTP stream of RSVPs within public Meetup groups. This method uses [chunked \ntransfer encoding](http:\/\/en.wikipedia.org\/wiki\/Chunked_transfer_encoding) \nto maintain a persistent connection with the client. This connection will only be \nterminated for server maintenance or a connection error.\n    ",
		"param_notes": "This method does not require authentication, or any parameters. Applications should\n                           only need a single connection to the stream, and at most 10 connections are allowed\n                           per client IP address.",
		"tag": "http",
		"params": {
			"since_mtime": "Return recent RSVP with an mtime greater than the supplied time, in milliseconds since the epoch",
			"since_count": "Request that some number of recent messages be sent immediately, if available. May not be specified in the same request as since_mtime."
		},
		"formats": ["json"],
		"doc_path": "\/stream\/2\/rsvps",
		"http_method": "GET",
		"errors": {
			"connection_limit": "the client IP has exceeded its maximum number of connections"
		},
		"name": "Chunked HTTP RSVP Stream",
		"path": "\/2\/rsvps",
		"response_notes": "\nThis stream includes the same JSON notification objects as its long-polling\n[counterpart](#polling). These are served one per HTTP chunk and terminated\nby newlines.",
		"examples": "\nTry out the RSVP stream on a command line:\n\n    curl -i http:\/\/stream.meetup.com\/2\/rsvps\n\nIf your system doesn't have curl, you can also use wget:\n\n    wget -qO- http:\/\/stream.meetup.com\/2\/rsvps\n\nAn application using the stream should keep track of the last RSVP **mtime** it has\nreceived, so that when disconnected it may resume where it left off:\n\n    curl -i http:\/\/stream.meetup.com\/2\/rsvps?since_mtime=1294435118533\n\nThe number of past rsvps the stream will return is limited. Applications that \nintend to consume all RSVP activity should reconnect within a few seconds to avoid \nmissing RSVP messages.\n    ",
		"group": "streams"
	}, {
		"desc": "\nThis [long-polling](http:\/\/en.wikipedia.org\/wiki\/Comet_%28programming%29#Script_tag_long_polling) \nstream can be easily consumed using JavaScript in any modern browser. Checkin\nnotifications are received when they happen, or as soon as your script finishes handling its\nlast notification.\n      ",
		"host": "stream",
		"param_notes": "These parameters are set automatically by Meetup's [must.js](https:\/\/github.com\/meetup\/must.js#readme) client.",
		"tag": "polling",
		"params": {
			"since_mtime": "Should be supplied for all but the first polling request, so that any missed notifications are can be sent in an immediate response",
			"*callback": "Name of a function to be called with an array of notification objects. \n If this parameter is not supplied, the chunked stream is joined instead.",
			"event_id": "Limit notifications to a specific event id. Use alphanumeric ids for repeating events.",
			"since_count": "Request that some number of recent messages be sent immediately, if available. May not be specified in the same request as since_mtime."
		},
		"formats": ["json"],
		"doc_path": "\/stream\/2\/checkins",
		"http_method": "GET",
		"response": {
			"member": ["Member who is checked in", {
				"member_photo": "URL of thumbnail",
				"member_name": "-",
				"member_id": "-"
			}],
			"checkin_id": "ID of the checkin",
			"time": "checkin time in milliseconds since the epoch",
			"lon": "Longitude, if provided",
			"event_id": "event checked into",
			"lat": "Latitude, if provided",
			"checker": ["Member who performed the checkin, if not the same as the one who checked in", {
				"member_photo": "URL of thumbnail",
				"member_name": "-",
				"member_id": "-"
			}]
		},
		"errors": {
			"connection_limit": "the client IP has exceeded its maximum number of connections"
		},
		"name": "Long-Polling Checkins Stream",
		"path": "\/2\/checkins",
		"response_notes": "Checkin notification objects include these properties. This method's response is \nan array of zero or more of these, while Meetup's JS client calls your callback function\nwith exactly one object.",
		"examples": "",
		"group": "deprecated"
	}, {
		"host": "stream",
		"desc": "\nFor browsers that support it, [WebSockets](http:\/\/dev.w3.org\/html5\/websockets\/) is a more\nefficient alternative to the long-polling stream. This is a **push only** endpoint and will discard\nany messages received from the client after the socket is open.\n\nBecause browser support for WebSockets is limited, we recommend that you consume this stream\nthrough the [must.js](https:\/\/github.com\/meetup\/must.js#readme) client, which can fallback to long-polling.\n    ",
		"param_notes": "The full URL for this method is **`ws:\/\/stream.meetup.com\/2\/checkins`**",
		"tag": "websockets",
		"params": {
			"since_mtime": "Return recent messages with an mtime greater then the supplied time, in millisends since the epoch",
			"event_id": "Limit notifications to a specific event id. Use alphanumeric ids for repeating events.",
			"since_count": "Request that some number of recent messages be sent immediately, if available. May not be specified in the same request as since_mtime."
		},
		"formats": ["json"],
		"doc_path": "\/stream\/2\/checkins",
		"http_method": "WS",
		"errors": {
			"connection_limit": "the client IP has exceeded its maximum number of connections"
		},
		"name": "WebSocket Checkins Stream",
		"path": "\/2\/checkins",
		"response_notes": "This stream includes the same JSON notification objects as its long-polling\n[counterpart](#polling), one per WebSocket frame.",
		"examples": "",
		"group": "deprecated"
	}, {
		"host": "stream",
		"desc": "\nThis method serves checkin notifications using\n[chunked encoding](http:\/\/en.wikipedia.org\/wiki\/Chunked_transfer_encoding)\nto maintian a persistent connection with a client. The connection will only be\nterminiated for server maintenance or a connection error. It is suitable for\nlow-level HTTP clients rather than web browsers.\n      ",
		"tag": "http",
		"params": {
			"since_mtime": "Return recent messages with an mtime greater then the supplied time, in millisends since the epoch",
			"event_id": "Limit notifications to a specific event id. Use alphanumeric ids for repeating events.",
			"since_count": "Request that some number of recent messages be sent immediately, if available. May not be specified in the same request as since_mtime."
		},
		"doc_path": "\/stream\/2\/checkins",
		"formats": ["json"],
		"http_method": "GET",
		"errors": {
			"connection_limit": "the client IP has exceeded its maximum number of connections"
		},
		"name": "Chunked HTTP Checkins Stream",
		"path": "\/2\/checkins",
		"response_notes": "\nThis stream includes the same JSON notification objects as its long-polling\n[counterpart](#polling). These are served one per HTTP chunk and terminated\nby newlines.",
		"examples": "\nTry out the checkins stream on the command line\n\n    curl -i http:\/\/stream.meetup.com\/2\/checkins\n    ",
		"group": "deprecated"
	}, {
		"host": "stream",
		"desc": "\nLive HTTP stream of events within public Meetup groups. This method uses [chunked\ntransfer encoding](http:\/\/en.wikipedia.org\/wiki\/Chunked_transfer_encoding)\nto maintain a persistent connection with the client. This connection will only be\nterminated for server maintenance or a connection error.\n      ",
		"param_notes": "This method does not require authentication, or any parameters. Applications should\n                           only need a single connection to the stream, and at most 10 connections are allowed\n                           per client IP address.",
		"params": {
			"since_mtime": "Return events with an mtime greater than the supplied time, in milliseconds since the epoch",
			"since_count": "Request that some number of recent messages be sent immediately, if available. May not be specified in the same request as since_mtime."
		},
		"formats": ["json"],
		"doc_path": "\/stream\/2\/open_events",
		"http_method": "GET",
		"response": {
			"rsvp_limit": "The number of \"yes\" rsvps an event can have before members will be added to the waiting list",
			"status": " \"upcoming\", \"proposed\", \"suggested\", \"canceled\" or \"deleted\" ",
			"payment_required": " \"1\" if required \"0\" otherwise",
			"photo_url": "URL of the event photo, if any",
			"mtime": "Last modified time of this event, in milliseconds since the epoch",
			"venue": ["Venue, if selected and not hidden", {
				"id": "venue id",
				"zip": "if US or Canada",
				"phone": "phone number of venue",
				"address_3": "line 3 of venue address",
				"name": "venue name",
				"lat, lon": "coordinates of venue",
				"address_1": "line 1 of venue address",
				"address_2": "line 2 of venue address",
				"city, status, country": "City, Country and if in US, State of the venue"
			}],
			"id": "The event id, May be numeric or alphanumeric, always served as a string",
			"utc_offset": "The local offset from UTC time, in milliseconds",
			"fee": ["fee info returned when payment is required", {
				"amount": "amount of the fee",
				"description": "fee description",
				"currency": "currency accepted for fee"
			}],
			"time": "UTC start time of the event, in milliseconds since the epoch",
			"venue_visibility": "Set to \"members\" or \"public\". The \"venue\" element will not be present if the visibility is \"members\".",
			"yes_rsvp_count": "Number of yes RSVPs including guests",
			"event_url": "URL of the event's page on meetup.com",
			"description": "HTML Description of the event",
			"name": "The name of the event",
			"group": ["Group that is hosting", {
				"id": "group id",
				"group_lat": "group latitude, approximate",
				"name": "group name",
				"group_lon": "group longitude, approximate",
				"join_mode": " \"open\", \"approval\", or \"closed\" ",
				"urlname": "group url name"
			}]
		},
		"errors": {
			"connection_limit": "the client IP has exceeded its maximum number of connections"
		},
		"name": "OpenEvents Stream",
		"path": "\/2\/open_events",
		"response_notes": "\n A response message is one HTTP chunk, the body of which is a single json object,\n                           described below, terminated by a newline.\n\nClients of this method can expect to be pushed events when\n\n  * an event is created\n  * a drafted event is published\n  * the title, description, time, or venue of the event changes\n  * the state of the event changes to or from `canceled`, `deleted`, `upcoming`, etc.\n\nNote that in cases where an event is scheduled to recur over time, changes to that event and future events\nwill broadcast those changes for any repeated occurrences of those events in the next 20 days.\n\nFor example, if a user creates a recurring event, the first instance as well as the next `n` instances of that event\nthat fall within the next 20 days will be pushed to clients.\n\nIf a user chooses to update the title of all upcoming instances of an event, the next `n` instances of that event\nthat fall within the next 20 days will be pushed to clients.\n      ",
		"examples": "\nTry out the open event stream on a command line:\n\n    curl -i http:\/\/stream.meetup.com\/2\/open_events \n\nIf your system doesn't have curl, you can also use wget:\n\n    wget -qO- http:\/\/stream.meetup.com\/2\/open_events\n\nAn application using the stream should keep track of the last event **mtime** it has\nreceived, so that when disconnected it may resume where it left off:\n\n    curl -i http:\/\/stream.meetup.com\/2\/open_events?since_mtime=1294435118533\n\nThe number of past events the stream will return is limited. Applications that\nintend to consume all event activity should reconnect within a few seconds to avoid\nmissing event messages. \n\nTo monitor RSVP activity, consider subscribing to the \/2\/rsvps stream\n      ",
		"group": "streams"
	}, {
		"desc": "\nThis [long-polling](http:\/\/en.wikipedia.org\/wiki\/Comet_%28programming%29#Script_tag_long_polling) \nstream can be easily consumed using JavaScript in any modern browser. Photo upload\nnotifications are received when they happen, or as soon as your script finishes handling its\nlast notification.\n      ",
		"host": "stream",
		"param_notes": "These parameters are set automatically by Meetup's [must.js](https:\/\/github.com\/meetup\/must.js#readme) client.",
		"tag": "polling",
		"params": {
			"since_mtime": "Should be supplied for all but the first polling request, so that any missed notifications are can be sent in an immediate response",
			"*callback": "Name of a function to be called with an array of photo notification objects. If this \nparameter is not supplied, the chunked stream is joined instead.",
			"event_id": "Limit notifications to a specific event id. Use alphanumeric ids for repeating events.",
			"since_count": "Request that some number of recent messages be sent immediately, if available. May not be specified in the same request as since_mtime."
		},
		"formats": ["json"],
		"doc_path": "\/stream\/2\/photos",
		"http_method": "GET",
		"response": {
			"member": ["Member that uploaded the photo", {
				"name": "Name of the member",
				"member_id": "ID of the member"
			}],
			"photo_link": "URL for the standard sized photo",
			"highres_link": "URL for the original sized photo",
			"thumb_link": "URL for the thumbail sized photo",
			"mtime": "Last updated time in milliseconds since the epoch",
			"photo_album": ["Photo album this photo belongs to", {
				"event": ["Event, when available, associated with the photo album", {
					"id": "ID of the event",
					"name": "Name of event"
				}],
				"photo_album_id": "ID for the photo album",
				"group": ["Group associated with photo album", {
					"id": "ID of group",
					"group_lat": "Group latitude",
					"name": "Name of group",
					"state": "If in the US, the state of the group",
					"group_topics": ["Topics associated with this group", {
						"urlkey": "Unique keyword",
						"topic_name": "Longer name"
					}],
					"group_lon": "Group longitude",
					"join_mode": " \"open\", \"approval\", or \"closed\" ",
					"urlname": "Unique portion of group's URL, no slashes",
					"city": "Group city",
					"country": "Group country code"
				}]
			}],
			"caption": "Photo caption if available",
			"photo_id": "ID of the photo",
			"ctime": "Created time in millisseconds since the epoch"
		},
		"errors": {
			"connection_limit": "the client IP has exceeded its maximum number of connections"
		},
		"name": "Long-Polling Photo Stream",
		"path": "\/2\/photos",
		"response_notes": "Photo upload notification objects include these properties. This method's response is \nan array of zero or more of these, while Meetup's JS client calls your callback function\nwith exactly one object.",
		"group": "streams",
		"examples": "\nInstall the Meetup stream client with [bower](http:\/\/bower.io\/)\n\n    $ bower install must\n\nThe HTML page below is empty until photos are inserted from the stream.\n\n    <html>\n      <head>\n        <script src=\"components\/jquery\/jquery.min.js\"><\/script>\n        <script src=\"components\/must\/must.js\"><\/script>\n        <script>\n          must.Photos(function(photo) {\n            $('#photos').prepend(\n              '<img src=\"' + photo.photo_link + '\"\/>'\n            );\n          });\n        <\/script>\n      <\/head>\n      <body>\n        <div id=\"photos\" \/>\n      <\/body>\n    <\/html>\n\nSee **picturethis** in our [stream github project](https:\/\/github.com\/meetup\/stream) \nfor a more advanced example.\n"
	}, {
		"host": "stream",
		"desc": "\nFor browsers that support it, [WebSockets](http:\/\/dev.w3.org\/html5\/websockets\/) is a more\nefficient alternative to the long-polling stream. This is a **push only** endpoint and will discard\nany messages received from the client after the socket is open.\n\nBecause browser support for WebSockets is limited, we recommend that you consume this stream\nthrough the [must.js](https:\/\/github.com\/meetup\/must.js#readme) client, which can fallback to long-polling.\n    ",
		"param_notes": "The full url for this method is **`ws:\/\/stream.meetup.com\/2\/photos`**",
		"tag": "websockets",
		"params": {
			"since_mtime": "Return recent photos with an mtime greater then the supplied time, in millisends since the epoch",
			"since_count": "Request that some number of recent messages be sent immediately, if available. May not be specified in the same request as since_mtime."
		},
		"formats": ["json"],
		"doc_path": "\/stream\/2\/photos",
		"http_method": "WS",
		"errors": {
			"connection_limit": "the client IP has exceeded its maximum number of connections"
		},
		"name": "WebSocket Photo Stream",
		"path": "\/2\/photos",
		"response_notes": "This stream includes the same JSON notification objects as its long-polling\n[counterpart](#polling), one per WebSocket frame.",
		"examples": "The [long-polling](#polling) stream examples will automatically use WebSockets, if available.",
		"group": "streams"
	}, {
		"host": "stream",
		"desc": "\nThis method serves photo notifications using\n[chunked encoding](http:\/\/en.wikipedia.org\/wiki\/Chunked_transfer_encoding)\nto maintian a persistent connection with a client. The connection will only be\nterminiated for server maintenance or a connection error. It is suitable for\nlow-level HTTP clients rather than web browsers.\n      ",
		"tag": "http",
		"params": {
			"since_mtime": "Return recent photos with an mtime greater then the supplied time, in millisends since the epoch",
			"since_count": "Request that some number of recent messages be sent immediately, if available. May not be specified in the same request as since_mtime."
		},
		"doc_path": "\/stream\/2\/photos",
		"formats": ["json"],
		"http_method": "GET",
		"errors": {
			"connection_limit": "the client IP has exceeded its maximum number of connections"
		},
		"name": "Chunked HTTP Photo Stream",
		"path": "\/2\/photos",
		"response_notes": "\nThis stream includes the same JSON notification objects as its long-polling\n[counterpart](#polling). These are served one per HTTP chunk and terminated\nby newlines.",
		"examples": "\nTry out the photo stream on the command line\n\n    curl -i http:\/\/stream.meetup.com\/2\/photos\n    ",
		"group": "streams"
	}, {
		"desc": "\nLive HTTP stream of the creation and modification of public Meetup venues using\n[chunked encoding](http:\/\/en.wikipedia.org\/wiki\/Chunked_transfer_encoding)\nto maintian a persistent connection with a client. The connection will only be\nterminiated for server maintenance or a connection error. It is suitable for\nlow-level HTTP clients rather than web browsers.\n      ",
		"host": "stream",
		"param_notes": "This method does not require authentication, or any parameters. Applications should\n                           only need a single connection to the stream, and at most 10 connections are allowed\n                           per client IP address. This method can also be used to download all of Meetup's public venues by passing in the URL request parameter 'trickle'",
		"tag": "http",
		"params": {
			"trickle": "When supplied with a request, the Meetup API will push your client the entire Meetup database of public venues in batches of 512",
			"since_mtime": "Return recent open venues with an mtime greater then the supplied time, in milliseconds since the epoch",
			"since_count": "Request that some number of recent messages be sent immediately, if available. May not be specified in the same request as since_mtime."
		},
		"formats": ["json"],
		"doc_path": "\/stream\/2\/open_venues",
		"http_method": "GET",
		"response": {
			"zip": "If available, the venue's zipcode",
			"lon": "If available, the venue's longitude",
			"phone": "If available, the venue's phone number",
			"address_3": "If available, the third address line of the venue",
			"state": "If available and the venue's country is within the US or Canada, the venue's state",
			"address_1": "If available, the first address line of the venue",
			"address_2": "If available, the second address line of the venue",
			"city": "If available, the name of the venue's city",
			"country": "If available, the name of the venue's country code",
			"id": "ID of the venue",
			"name": "If available, the venue's name",
			"lat": "If available, the venue's latitude"
		},
		"errors": {
			"connection_limit": "the client IP has exceeded its maximum number of connections"
		},
		"name": "Chunked HTTP Open Venues Stream",
		"path": "\/2\/open_venues",
		"response_notes": "Responses will be in the format of JSON notification objects, served one per HTTP chuck terminated by newlines",
		"group": "streams",
		"examples": "\nTry out the open venues stream on the command line\n\n    curl -i http:\/\/stream.meetup.com\/2\/open_venues\n\nOr stream all Meetup public venues using the trickle request parameter\n\n    curl -i http:\/\/stream.meetup.com\/2\/open_venues?trickle\n    "
	}, {
		"desc": "\nThis [long-polling](http:\/\/en.wikipedia.org\/wiki\/Comet_%28programming%29#Script_tag_long_polling)\nstream can be easily consumed using JavaScript in any modern browser. Event Comment\nnotifications are received when they happen, or as soon as your script finishes handling its\nlast notification.",
		"host": "stream",
		"param_notes": "These parameters are set automatically by Meetup's [must.js](https:\/\/github.com\/meetup\/must.js#readme) client.",
		"tag": "polling",
		"params": {
			"since_mtime": "Should be supplied for all but the first polling request, so that any missed notifications are can be sent in an immediate response",
			"*callback": "Name of a function to be called with an array of Event Comment notification objects. If this\nparameter is not supplied, the chunked stream is joined instead.",
			"event_id": "Limit notifications to a specific event id. Use alphanumeric ids for repeating events.",
			"since_count": "Request that some number of recent messages be sent immediately, if available. May not be specified in the same request as since_mtime."
		},
		"formats": ["json"],
		"doc_path": "\/stream\/2\/event_comments",
		"http_method": "GET",
		"response": {
			"member": ["Member who posted the comment", {
				"member_name": "Full name given",
				"photo": "If available, the photo of the member posting the comment",
				"member_id": "Unique numeric id"
			}],
			"id": "Unique numeric identifier",
			"status": "Set to 'active' or 'deleted'. Comments are republished to the stream when members delete them, so that apps may update their local comment display.",
			"event": ["Event comment was posted in", {
				"event_id": "Unique numeric id",
				"event_name": "Name of the event"
			}],
			"mtime": "Last modified time of this event comment, in milliseconds since the epoch",
			"group": ["Group hosting the event", {
				"group_name": "-",
				"group_state": "two-letter code of group's home state, if in US or CA",
				"group_city": "Group's home city",
				"group_lat": "Latitude of group's approximate location",
				"group_urlname": "Unique portion of group's URL, no slashes",
				"group_id": "Numeric identifier of the group",
				"group_country": "two-letter code of group's home country",
				"group_lon": "Longitude of group's approximate location"
			}],
			"comment": "The comment text"
		},
		"errors": {
			"connection_limit": "the client IP has exceeded its maximum number of connections"
		},
		"name": "Long-Polling Event Comments Stream",
		"path": "\/2\/event_comments",
		"response_notes": "Event Comment notification objects include these properties. This method's response is\nan array of zero or more of these, while Meetup's JS client calls your callback function\nwith exactly one object.",
		"group": "streams",
		"examples": "\nInstall the Meetup stream client with [bower](http:\/\/bower.io\/)\n\n    $ bower install must\n\nThe HTML page draws a table of Event Comments as they are received.\n\n    <html>\n      <head>\n         <script src=\"components\/jquery\/jquery.min.js\"><\/script>\n        <script src=\"components\/must\/must.js\"><\/script>\n        <script>\n          must.Comments(function(comment) {\n            $('#comments').prepend(\n              '<tr><td>' + comment.member.member_name +\n              '<\/td><td>' + new Date(comment.mtime) +\n              '<\/td><td>' + comment.comment +\n              '<\/td><\/tr>'\n            );\n          });\n        <\/script>\n      <\/head>\n      <body>\n        <table><thead>\n          <tr><th>Who<\/th><th>When<\/th><th>What<\/th><\/tr>\n        <\/thead><tbody id=\"comments\">\n        <\/tbody><\/table>\n      <\/body>\n    <\/html>\n"
	}, {
		"host": "stream",
		"desc": "\nFor browsers that support it, [WebSockets](http:\/\/dev.w3.org\/html5\/websockets\/) is a more\nefficient alternative to the long-polling stream. This is a **push only** endpoint and will discard\nany messages received from the client after the socket is open.\n\nBecause browser support for WebSockets is limited, we recommend that you consume this stream\nthrough the [must.js](https:\/\/github.com\/meetup\/must.js#readme) client, which can fallback to long-polling.\n    ",
		"param_notes": "The full URL for this method is **`ws:\/\/stream.meetup.com\/2\/event_comments`**",
		"tag": "websockets",
		"params": {
			"since_mtime": "Return recent Event Comments with an mtime greater than the supplied time, in milliseconds since the epoch",
			"event_id": "Limit notifications to a specific event id. Use alphanumeric ids for repeating events.",
			"since_count": "Request that some number of recent messages be sent immediately, if available. May not be specified in the same request as since_mtime."
		},
		"formats": ["json"],
		"doc_path": "\/stream\/2\/event_comments",
		"http_method": "WS",
		"errors": {
			"connection_limit": "the client IP has exceeded its maximum number of connections"
		},
		"name": "WebSockets Event Comments Stream",
		"path": "\/2\/event_comments",
		"response_notes": "This stream includes the same JSON notification objects as its long-polling\n[counterpart](#polling), one per WebSocket frame.",
		"examples": "The [long-polling](#polling) stream examples will automatically use WebSockets, if available.",
		"group": "streams"
	}, {
		"host": "stream",
		"desc": "\nLive HTTP stream of Event Comments  within public meetup groups. This method uses [chunked\ntransfer encoding](http:\/\/en.wikipedia.org\/wiki\/Chunked_transfer_encoding)\nto maintain a persistent connection with the client. This connection will only be\nterminated for server maintenance or a connection error.\n    ",
		"param_notes": "This method does not require authentication, or any parameters. Applications should\n                           only need a single connection to the stream, and at most 10 connections are allowed\n                           per client IP address.",
		"tag": "http",
		"params": {
			"since_mtime": "Return recent Event Comments with an mtime greater than the supplied time, in milliseconds since the epoch",
			"event_id": "Limit notifications to a specific event id. Use alphanumeric ids for repeating events.",
			"since_count": "Request that some number of recent messages be sent immediately, if available. May not be specified in the same request as since_mtime."
		},
		"formats": ["json"],
		"doc_path": "\/stream\/2\/event_comments",
		"http_method": "GET",
		"errors": {
			"connection_limit": "the client IP has exceeded its maximum number of connections"
		},
		"name": "Chunked HTTP Event Comments Stream",
		"path": "\/2\/event_comments",
		"response_notes": "\nThis stream includes the same JSON notification objects as its long-polling\n[counterpart](#polling). These are served one per HTTP chunk and terminated\nby newlines.",
		"examples": "\nTry out the Event Comments stream on a command line:\n\n    curl -i http:\/\/stream.meetup.com\/2\/event_comments\n\nIf your system doesn't have curl, you can also use wget:\n\n    wget -qO- http:\/\/stream.meetup.com\/2\/event_comments\n\nAn application using the stream should keep track of the last Event Comment **mtime** it has\nreceived, so that when disconnected it may resume where it left off:\n\n    curl -i http:\/\/stream.meetup.com\/2\/event_comments?since_mtime=1294435118533\n\nThe number of past Event Comments the stream will return is limited. Applications that\nintend to consume all Event Comment activity should reconnect within a few seconds to avoid\nmissing Event Comment messages.\n    ",
		"group": "streams"
	}, {
		"desc": "Approves one or more requests for group membership",
		"param_notes": "The :urlname path element may be any valid group urlname or domain name. If you need access to your group's welcome message, you can access it from the [\/2\/groups](\/meetup_api\/docs\/2\/groups\/#response) method, providing a value of `welcome_message` for the fields parameter. To get a list of pending members, as an organizer, you can request the status `pending` in the [\/2\/profiles](\/meetup_api\/docs\/2\/profiles\/#params) method.",
		"tag": "create",
		"params": {
			"member": "Comma-delimited numeric pending member IDs. The maximum allowed is 200",
			"send_copy": "Optional Boolean value indicating whether or not the org should receive a copy of the message sent to the approved members",
			"welcome_message": "Optional message to send to the members being approved. If not provided, the groups default welcome message will be sent. Max message size is 2000"
		},
		"api_version": "3",
		"formats": ["json"],
		"http_method": "POST",
		"scopes": ["basic"],
		"name": "Membership Approval",
		"path": "\/:urlname\/member\/approvals",
		"response_notes": "A successful request will result in a simple JSON-encoded message with an HTTP 200 response.",
		"examples": "\n Approve requests for membership in your group\n\n    curl 'http:\/\/api.meetup.com\/your-group\/member\/approvals' -d 'key=API_KEY&member=123,456'\n    {\"message\":\"ok\"}\n\n Members 123 and 456 will get an email notification\n          ",
		"group": "profiles"
	}, {
		"desc": "Lists attendance records for Meetup events. Limited for use by administrative members.",
		"param_notes": "The :urlname path element may be any valid group urlname or domain name. The :id path element must be a valid alphanumeric Meetup event identifier",
		"tag": "list",
		"params": {
			"member": "Raw text used to search for member by name. This may only be applied when the filter parameter is set to 'all'. The provided text must consist of at least 2 characters.",
			"filter": "A named filter to apply to the attendance list. These are roughly equivalent to the set of filters you will see in the attendance tool on the site. These filters correspond with attendance records as well as each member's original RSVP status. The filter value be one of: maybe, waitlist, yes, absent, all, attended, noshow, excused, no. The default is 'attended'. The 'absent' filter represents all members not in attendance including members with a 'noshow' status. An 'excused' absence is an absent member marked as such by an administrative member"
		},
		"api_version": "3",
		"formats": ["json"],
		"response": {
			"member": ["Member in or not in attendance", {
				"id": "Numeric member ID",
				"name": "Name of the member",
				"photo": ["Member's photo, if available", {
					"thumb": "Thumbnail photo url"
				}]
			}],
			"status": "The member's attendance status. May be one of: noshow, absent, attended",
			"rsvp": ["RSVP, if member originally RSVP'd", {
				"response": "Member's original RSVP response. May be one of: maybe, waitlist, yes, no, havent",
				"guests": "number of guests"
			}]
		},
		"http_method": "GET",
		"scopes": ["basic"],
		"name": "Attendance",
		"path": "\/:urlname\/events\/:id\/attendance",
		"group": "events"
	}, {
		"desc": "Takes Member attendance for an Event. Limted for use by administrative members.",
		"param_notes": "The :urlname path element may be any valid group urlname or domain name. The :id path element must be a valid alphanumeric Meetup event identifier. Highlighted fields are required.",
		"tag": "edit",
		"params": {
			"*status": "An attendance status for the member. Must be one of: noshow, absent, attended",
			"*member": "A valid ID of member in the group",
			"headcount": "Sets the overall headcount for the event. This may not necessarily correlate with the list of attendees in this group if the event is part of a joint Meetup event",
			"guests": "The number of guests accompanying member. Maximum of 99 is allowed."
		},
		"api_version": "3",
		"formats": ["json"],
		"http_method": "POST",
		"scopes": ["basic"],
		"name": "Attendance Taking",
		"path": "\/:urlname\/events\/:id\/attendance",
		"response_notes": "If successful, this method returns a 200 response with a JSON-encoded success message, otherwise failures will result a 400 response",
		"group": "events"
	}, {
		"desc": "Performs multiple API requests in batch, useful for reducing HTTP network requests. This method is only available for OAuth authentication",
		"param_notes": " You may supply up to 10 API requests in one batch request using the required \"requests\" parameter.\n Each of these individual batched requests will be tallied separately the same way they would when making individual requests.\n The batch request itself will not be tallied. As such, batch requests can not be rate limited.\n The only failures that you should account for are an authentication failure or a malformed JSON encoding of requests provided with the \"requests\" parameter.\n\n#### Composing batch requests\n\n Requests should be provided within a JSON-encoded array in the following format attached the `requests` parameter\n within a POST body\n\n<pre>\n [{\n   \"path\": \"\/2\/member\/self\",\n   \"ref\":  \"me\",\n   \"params\": {\n     \"only\": \"name,id\"\n   }\n }]\n<\/pre>\n\n Only \"path\" is required for HTTP GET requests. \"path\" represents the API path for the method. \"ref\" provides a way to tag a request in a batch\n with a label that you can associated with its response in the body of the batch response. This will default to the\n provided \"path\". You may also supply a \"params\" key with a JSON object representing the parameters provided for the\n request. At this time only HTTP GET, DELETE, and POST requests are supported. You may specify one of these as a \"method\" property of the request.\n Methods requiring a multipart form POST are currently not supported. You may also supply headers on a per request basis by adding a \"headers\" field to the\n JSON object representing the request as key value pairs of strings.\n\n#### Interpreting batch responses\n\n A response to a batch request will be in the format\n\n<pre>\n [{\n   \"path\": \"\/2\/member\/self\"\n   \"status\": 200,\n   \"ref\": \"me\",\n   \"body\": {\n     \"id\": 1234,\n     \"name\": \"Noah\"\n   },\n   \"headers\": {\n     \"key\": \"value\"\n    }\n }]\n<\/pre>\n\n \"path\" is the path of the method invoked. \"status\" represents the HTTP status code returned for the request.\n \"ref\" is the name provided for the inbound request. \"body\" is the JSON-encoded response from the given API request.\n \"headers\" is a JSON-encoded object representing the headers returned for that request.\n These requests may fail the same way they would when making individual requests. The response will indicate these\n failures.\n\n In order to preserve server resources and return batch responses within a reasonable amount of time, individual requests may will timeout\n if a response is not computed within a reasonable amount of time. This allows for some requests to fail and others to pass which is a nicer\n alternative to an all or nothing response timeout.\n A timed out request can be identified by inspecting its response's \"status\" field for a value of 504. A timed out response may look like.\n\n<pre>\n [{\n   \"status\" : 504,\n   \"body\" : {\n    \"errors\" : [{\"code\": \"request_timeout\", \"message\":\"request timed out\"}]\n   },\n   \"headers\" : { ... },\n   \"path\" : \"\/end\/point\",\n   \"ref\" : \"request_ref\"\n }]\n<\/pre>\n",
		"params": {
			"*requests": "JSON-encoding of multiple request objects as described in the parameter notes"
		},
		"api_version": "3",
		"formats": ["json"],
		"http_method": "POST",
		"scopes": ["basic"],
		"name": "batch",
		"path": "\/batch",
		"response_notes": "The response will be a JSON-encoded array of responses to requests defined in the batch request",
		"group": "batch",
		"examples": "Below is an example of making batch request issued by the command line program, curl\n\n<pre>\n# define a file containing the request body containing the requests to execute\ncat batch.requests\nrequests=[{\n  \"path\":\"\/2\/member\/self\"\n},{\n  \"path\": \"\/2\/events\",\n  \"params\": {\n    \"member_id\":\"self\",\n    \"rsvp\": \"yes\",\n    \"only\":\"name,time\"\n  }\n}]\n\n# perform an HTTP POST request with the body set to the contents of the batch.requests file\ncurl -H \"Authorization: Bearer $OAUTH2_ACCESS_TOKEN\" https:\/\/api.meetup.com\/batch -d @batch.requests\n<\/pre>\n\n You may also discard fields as you can do with any other method. Below is an example of only fetching the bodies of the responses\n to the requests.\n\n<pre>\ncurl -H \"Authorization: Bearer $OAUTH2_ACCESS_TOKEN\" https:\/\/api.meetup.com\/batch?only=body -d @batch.requests\n<\/pre>\n"
	}, {
		"response": {
			"id": "Numeric ID of discussion board",
			"updated": "Time board was updated in milliseconds since the epoch",
			"discussion_count": "Number of discussions on this board",
			"created": "Time board was created in milliseconds since the epoch",
			"post_count": "Number of posts in discussions on this board",
			"latest_reply": ["The latest reply on this board", {
				"member": ["The posting member", {
					"name": "Member name"
				}],
				"created": "Time reply was posted in milliseconds since the epoch"
			}],
			"name": "Discussion board name",
			"group": ["The group associated with this board", {
				"id": "Numeric ID of group"
			}]
		},
		"http_method": "GET",
		"scopes": ["basic"],
		"desc": "Listings of Group discussion boards",
		"param_notes": "The :urlname path element may be any valid group urlname or domain name",
		"name": "Discussion Boards",
		"path": "\/:urlname\/boards",
		"group": "boards",
		"examples": "\nGet a list of the current [Dashing Whippet's boards](http:\/\/www.dashingwhippets.org\/messages\/boards\/)\n\n    curl 'http:\/\/api.meetup.com\/dashing-whippets\/boards?key=API_KEY'\n\n [Try it in the console](\/meetup_api\/console\/?path=\/:urlname\/boards&:urlname=dashing-whippets)\n",
		"api_version": "3",
		"formats": ["json"]
	}, {
		"desc": "Returns venues a group has previously hosted events at",
		"param_notes": "The :urlname path element may be any valid group urlname or domain name. All parameters are optional",
		"tag": "list",
		"api_version": "3",
		"formats": ["json"],
		"response": {
			"zip": "If available, the venue's zipcode",
			"phone": "If available, the venue's photo number",
			"lon": "If available, the venue's longitude",
			"address_3": "If available, the third address line of the venue",
			"visibility": "'private' if this venue is a private home, otherwise 'public'",
			"state": "If available and the venue's country id within the US or Canada, the venue's state",
			"address_1": "If available, the first address line of the venue",
			"address_2": "If available, the second address line of the venue",
			"country": "If available, the name of the venue's country code",
			"city": "If available, the name of the venue's city",
			"id": "ID, of the venue",
			"name": "If available, the venue's name",
			"lat": "If available, the venue's latitude"
		},
		"http_method": "GET",
		"scopes": ["basic"],
		"name": "Group Venues",
		"path": "\/:urlname\/venues",
		"response_notes": "Meetup venue data comes from varying sources and may not contain all documented parameters",
		"group": "venues"
	}, {
		"desc": "Declines one or more requests for group membership",
		"param_notes": "The :urlname path element may be any valid group urlname or domain name. To get a list of pending members, as an organizer, you can request the status `pending` in the [\/2\/profiles](\/meetup_api\/docs\/2\/profiles\/#params) method.",
		"tag": "delete",
		"params": {
			"member": "Comma-delimited numeric pending member IDs. The maximum allowed is 200",
			"send_copy": "Optional Boolean value indicating whether or to send a copy to the member issuing the decline. Default is true",
			"ban": "Optional Boolean value indicating whether or not to ban the member in the future. Default is false",
			"anon": "Optional Boolean value indicating whether your email should be revealed to the members. Default is false.",
			"explanation": "Optional explanation to send to the members being declined. Max message size is 2000"
		},
		"api_version": "3",
		"formats": ["json"],
		"http_method": "DELETE",
		"scopes": ["basic"],
		"name": "Membership Decline",
		"path": "\/:urlname\/member\/approvals",
		"response_notes": "A successful request will result in a simple JSON-encoded message with an HTTP 200 response",
		"examples": "\n Decline requests for membership in your group\n\n    curl -X DELETE 'http:\/\/api.meetup.com\/your-group\/member\/approvals?key=API_KEY&member=123,456'\n    {\"message\":\"ok\"}\n\n Members 123 and 456 will get an email notification\n          ",
		"group": "profiles"
	}, {
		"desc": "Listings of Group discussions",
		"param_notes": "The :urlname path element may be any valid group urlname or domain name. The :bid path element may be any valid board ID for this group.",
		"api_version": "3",
		"formats": ["json"],
		"response": {
			"id": "Numeric discussion ID",
			"body": "The contents of the first post in this discussion",
			"last_post": ["The last post made in this discussion", {
				"member": ["The posting member", {
					"name": "Member name"
				}],
				"created": "Time post was made in milliseconds since the epoch"
			}],
			"reply_count": "Number of replies this discussion has",
			"updated": "Time board was updated in milliseconds since the epoch",
			"created": "Time board was created in milliseconds since the epoch",
			"subject": "The subject of the first post in this discussion",
			"started_by": ["The member that started this discussion", {
				"name": "Member name"
			}],
			"board": ["The board this discussion belongs to", {
				"id": "Numeric ID of this discussion's board"
			}]
		},
		"http_method": "GET",
		"scopes": ["basic"],
		"name": "Discussions",
		"path": "\/:urlname\/boards\/:bid\/discussions",
		"orders": {
			"thread_reply_count": "by the threads reply count",
			"last_post_date": "(default) by post date",
			"member_name": "by posting member's name",
			"thread_view_count": "by the number of views a thread has"
		},
		"group": "boards",
		"examples": "\nGet a list of the current discussions going on in\nThe Dashing Whippet's [Whippet lounge](http:\/\/www.dashingwhippets.org\/messages\/boards\/forum\/1061014)\n\n    curl 'http:\/\/api.meetup.com\/dashing-whippets\/boards\/1061014\/discussions?key=API_KEY'\n\n [Try it in the console](\/meetup_api\/console\/?path=\/:urlname\/boards\/:bid\/discussions&:urlname=dashing-whippets&:bid=1061014)\n"
	}, {
		"response": {
			"member": ["The member that started this discussion", {
				"id": "Member ID",
				"name": "Member name",
				"state": "State if in the US",
				"photo": ["Photo object for active member", {
					"thumb": "Thumbnail photo url"
				}],
				"city": "City, if provided, for the member",
				"country": "Country, if provided, for the member"
			}],
			"id": "Numeric post ID",
			"body": "content of the post",
			"discussion": ["The discussion this was posted in", {
				"id": "Numeric discussion ID"
			}],
			"updated": "Time post was updated in milliseconds since the epoch",
			"created": "Time post was created in milliseconds since the epoch",
			"subject": "subject of the post",
			"in_reply_to": "ID of the post this was in reply to"
		},
		"http_method": "GET",
		"scopes": ["basic"],
		"desc": "Listing Group discussion posts",
		"param_notes": "The :urlname path element may be any valid group urlname or domain name. The :bid path element maybe any valid board ID for this group. The :did may be any valid discussion ID for this board",
		"name": "Discussion Posts",
		"path": "\/:urlname\/boards\/:bid\/discussions\/:did",
		"group": "boards",
		"api_version": "3",
		"formats": ["json"]
	}, {
		"desc": "Allows organizers of a group to note payments made by members for an event. This is the 'Mark Paid' feature seen in the RSVP listings on event details pages and affects the 'pay_status' response fields in [2\/rsvps](\/meetup_api\/docs\/2\/rsvps\/#response) for paid events",
		"param_notes": "Only organizer may submit payment information for members and only one payment may be submitted for a member for a given event",
		"params": {
			"*member": "Member Id of member who made a payment",
			"paid_on": "The time the payment was made in milliseconds from the epoc. Defaults to now",
			"quantity": "The number of payments made. Defaults to 1",
			"*amount": "The monetary amount of money the member submited"
		},
		"api_version": "3",
		"formats": ["json"],
		"response": {
			"id": "Unique identifier for the payment",
			"confirm_code": "Confirmation code for the payment"
		},
		"http_method": "POST",
		"scopes": ["basic"],
		"name": "Event Payments",
		"path": "\/:urlname\/events\/:id\/payments",
		"group": "events",
		"examples": "\n Collect a payment in my-group for event 123 by member 456\n\n    curl 'https:\/\/api.meetup.com\/my-group\/events\/123\/payments' \\\n         -d 'key=ORG_API_KEY&member=456&amount=10.00'\n"
	}, {
		"desc": "Text, location, category and friend-based group searches",
		"param_notes": "All parameters are optional. If you do not supply some form of location, the results will be implicitly based on your IP's geographic location. See the 'filter' parameter for more information controlling the results returned. Ordering does not apply to friend-filtered queries.",
		"params": {
			"zip": "Zipcode of location to limit search to",
			"text": "Raw full text search query",
			"lon": "Approximate longitude",
			"location": "Raw text location query",
			"country": "A valid two character country code, defaults to US",
			"category": "Comma-delimited list of numeric category ids",
			"self_groups": "set to 'include' or 'exclude' meetups the authorized member belongs to; default is 'include'",
			"upcoming_events": "If true, filters text and category based searches on groups that have upcoming events. Defaults to false",
			"radius": "Radius in miles. May be 0.0-100.0, 'global' or 'smart', a dynamic radius based on the number of active groups in the area",
			"filter": "Determines which groups are returned. If 'all' (default), the text and category parameters are applied. If 'friends', groups your friends are in are returned. The value of this parameter may be one of all, friends",
			"lat": "Approximate latitude",
			"fields": "Request that additional fields (separated by commas) be included in the output."
		},
		"api_version": "3",
		"formats": ["json"],
		"response": {
			"is_simplehtml": "Optional field, 'true' when the group description has been saved in a simplified HTML format, 'false' otherwise.",
			"visibility": "Who can see this group. One of members, public or public_limited",
			"link": "Link to group on meetup.com",
			"next_event": ["The next upcoming event, if the group has one", {
				"id": "Alphanumeric event ID",
				"time": "UTC start time of the event, in milliseconds since the epoch",
				"name": "Name of event"
			}],
			"state": "State of the group, if in US or Canada",
			"self": ["Optional field, contains details specific to the authorized user if an active member of this group", {
				"visited": "Member's last visit to the group site, in milliseconds since the epoch",
				"status": "Optional fields property returned when 'self_status' is provided. Indicates the authorized user's membership with this group. Value may be one of pending, pending_payment, active, blocked or none",
				"role": "Member's role in group, if any: Organizer, Assistant Organizer, Event Organizer, etc.",
				"actions": "list of actions the current user may perform, potentially \"event_create\": the ability to create new events, \"event_draft\": the ability to save new events as drafts, \"role_assign\": the ability to assign member roles, or \"edit\": the ability to edit group settings"
			}],
			"similar_groups": ["Optional fields parameter. Returns up to 5 groups similar to this groups", {
				"id": "Id of the group",
				"photos": ["Optional fields parameter. A small set of photos from the group", {
					"id": "Numeric photo ID",
					"photo_link": "Link for standard sized photo",
					"highres_link": "Link for full sized photo",
					"thumb_link": "Link for thumbnail sized photo"
				}],
				"lon": "Longitude",
				"name": "Name of the group",
				"join_mode": "Who can join this group and how. One of approval, closed, open",
				"urlname": "Urlname used to identify the group on meetup.com",
				"lat": "Latitude",
				"who": "What this group calls it's members"
			}],
			"membership_dues": ["Optional field, returns membership dues for group if any", {
				"methods": ["Methods of payments", {
					"other": "Boolean indicator that other forms of payment are accepted",
					"amazon_payments": "Boolean indicator that Amazon Payments are accepted",
					"credit_card": "Boolean indicator that credit cards are accepted",
					"paypal": "Boolean indicator that Paypal payments are accepted"
				}],
				"fee": "Numeric fee value",
				"required_to": "If the dues are required this indicates what they are required for. May be one of 'join' or 'rsvp'",
				"trial_days": "When present, returns the number of days the group is offering a free trial period for to new members. When not present, this indicates that the group does not offer a trial membership period",
				"required": "true if dues are required",
				"fee_desc": "Description of fee",
				"refund_policy": ["Conditions for refunds", {
					"none": "indicates there is no refund policy",
					"group_closes": "refund applies when the group closes",
					"member_leaves": "refund applies when member leaves the group",
					"member_banned": "refund applies when the member is banned",
					"custom": "Boolean indicator of a custom refund policy"
				}],
				"currency": "Currency fee is declared as"
			}],
			"join_mode": "Who can join this group and how. One of approval, closed, open",
			"city": "City of the group",
			"who": "What the group calls its members",
			"id": "Numeric group ID",
			"timezone": "This represents the universal timezone identifier for the group",
			"list_addr": "Optional field returning list address prefix. List mail will be {list_addr}-list@meetup.com. Announce email will be {list_addr}-announce@meetup.com. You must be a member of the group to see this",
			"created": "Time the group was created in milliseconds since the epoch",
			"description": "Short description of group",
			"name": "Name of the group",
			"ga_code": "Optional field return the Google Analytics code for the group. Only members that can edit group settings can see this",
			"urlname": "Urlname used to identify the group on meetup.com",
			"members": "Number of Meetup members in this group",
			"lat": "Latitude",
			"list_mode": "Optional fields parameter representing the policy for who can post the group mailing list. One of moderated, off, open, orgs_only",
			"lon": "Longitude",
			"join_info": ["Optional field, lists any questions requested when joining and required fields", {
				"questions": ["List of questions asked by organizer", {
					"id": "Unique identifier for the question",
					"question": "The text of the question"
				}],
				"intro_required": "true if required, false otherwise",
				"questions_req": "true if required, false otherwise",
				"photo_required": "true if required, false otherwise"
			}],
			"organizer": ["Group's primary organizer", {
				"id": "Numeric member ID",
				"bio": "Bio of member",
				"name": "Name of member"
			}],
			"short_link": "Optional field, a shorted URL for the group",
			"country": "Country of the group",
			"photos": ["A small set of photos from the group", {
				"id": "Numeric photo ID",
				"photo_link": "Link for standard sized photo",
				"highres_link": "Link for full sized photo",
				"thumb_link": "Link for thumbnail sized photo"
			}],
			"topics": ["Optional fields parameter. Returns the group's topics", {
				"id": "Numeric topic id",
				"urlkey": "The unique keyword used to identify this topic",
				"name": "Display name of the topic",
				"lang": "Language topic originates from"
			}],
			"category": ["The primary category of the group, if the group has one", {
				"id": "Numeric category id",
				"name": "Display name of the category",
				"shortname": "String identifier of the category"
			}],
			"welcome_message": "Optional fields parameter. Returns the Group's default welcome message if the authenticated member is the organizer of the group",
			"group_photo": ["Group photo", {
				"id": "Numeric photo ID",
				"photo_link": "Link for standard sized photo",
				"highres_link": "Link for full sized photo",
				"thumb_link": "Link for thumbnail sized photo"
			}],
			"simple_html_description": "Description of the group, in simple HTML source format. If this group's description was saved in simple HTML format, the description field will be an HTML translation of this source"
		},
		"http_method": "GET",
		"scopes": ["basic"],
		"name": "Find Groups",
		"path": "\/find\/groups",
		"orders": {
			"most_active": "Order by group with most active members",
			"distance": "Order by distance",
			"newest": "Order by date group was founded",
			"members": "Order by number of members"
		},
		"group": "groups"
	}, {
		"desc": "Allows organizers to edit their Meetup group information. To change group topics, see the [add](\/meetup_api\/docs\/:urlname\/topics\/#add) and [remove](\/meetup_api\/docs\/:urlname\/topics\/#remove) topics endpoints. To change group photo use the [Group photo upload](\/meetup_api\/docs\/2\/group_photo\/#create) endpoint",
		"param_notes": "All parameters are optional.",
		"tag": "edit",
		"params": {
			"zip": "The ZIP code of the city",
			"question_edit_{id}": "Edits a current profile question identified by an id in the parameter name. The index updated index should also be encoded in the parameter name. To delete a question, set this to an empty string. Groups that require profile questions must have at least one question",
			"remove_topics": "Comma-delimited list of topic ids to disassociate with group",
			"visibility": "Restricts group visibility for non-members. May be one of 'public', 'public_limited' or 'members'. Note, the 'members' option is only available to groups that already have 'members' visibility",
			"questions_req": "Indicates that provide questions are required before joining. Expects true or false values",
			"join_mode": "Controls how member's are let into the group. May be one of 'open' meaning any Meetup member my join, 'closed' meaning group is not currently accepting new members, or 'approval' meaning members must be approved by an organizer. Note, the 'closed' options is only available to groups that already have a 'closed' join_mode",
			"question_{index}": "A new profile question defined in the order of index provided in the request parameter name",
			"country": "The ISO_3166-1 country code for the country which contains the city",
			"intro_req": "Indicates that a member must supply an introduction before joining. Expects true or false values",
			"who": "What members of the group will be called. Can be at most 32 characters",
			"welcome_message": "Message sent to members after they join. Can be at most 2000 characters",
			"photo_req": "Indicates that a member must provide a photo before joining. Expects true or false values",
			"list_addr": "Mailing list prefix. By default this is the Group's urlname.",
			"description": "Summary of what the Meetup group is about in simple HTML format",
			"name": "Display name of the group. Can be at most 60 characters",
			"ga_code": "Google Analytics code for group",
			"{service}_uri": "A URI for a social network service. Service must be one of facebook, flickr, linkedin, other, tumblr, twitter",
			"dryrun": "Boolean parameter that will cause this endpoint to apply all validation rules without actually saving changes in which case the response will only reflect the group's current attributes",
			"urlname": "Name used for the groups web address on meetup.com. Must be between 6 and 60 characters",
			"list_mode": "Defines policy for who can post to the group mailing list. May be one of 'open' meaning any Member can post, 'off' meaning no one can post, 'moderated' meaning messages must be approved, or 'orgs_only' meaning only organizers may post to the list",
			"add_topics": "Comma-delimited list of topic ids to associate with group"
		},
		"api_version": "3",
		"formats": ["json"],
		"http_method": "POST",
		"response": {
			"is_simplehtml": "Optional field, 'true' when the group description has been saved in a simplified HTML format, 'false' otherwise.",
			"visibility": "Who can see this group. One of members, public or public_limited",
			"link": "Link to group on meetup.com",
			"next_event": ["The next upcoming event, if the group has one", {
				"id": "Alphanumeric event ID",
				"time": "UTC start time of the event, in milliseconds since the epoch",
				"name": "Name of event"
			}],
			"state": "State of the group, if in US or Canada",
			"self": ["Optional field, contains details specific to the authorized user if an active member of this group", {
				"visited": "Member's last visit to the group site, in milliseconds since the epoch",
				"status": "Optional fields property returned when 'self_status' is provided. Indicates the authorized user's membership with this group. Value may be one of pending, pending_payment, active, blocked or none",
				"role": "Member's role in group, if any: Organizer, Assistant Organizer, Event Organizer, etc.",
				"actions": "list of actions the current user may perform, potentially \"event_create\": the ability to create new events, \"event_draft\": the ability to save new events as drafts, \"role_assign\": the ability to assign member roles, or \"edit\": the ability to edit group settings"
			}],
			"similar_groups": ["Optional fields parameter. Returns up to 5 groups similar to this groups", {
				"id": "Id of the group",
				"photos": ["Optional fields parameter. A small set of photos from the group", {
					"id": "Numeric photo ID",
					"photo_link": "Link for standard sized photo",
					"highres_link": "Link for full sized photo",
					"thumb_link": "Link for thumbnail sized photo"
				}],
				"lon": "Longitude",
				"name": "Name of the group",
				"join_mode": "Who can join this group and how. One of approval, closed, open",
				"urlname": "Urlname used to identify the group on meetup.com",
				"lat": "Latitude",
				"who": "What this group calls it's members"
			}],
			"membership_dues": ["Optional field, returns membership dues for group if any", {
				"methods": ["Methods of payments", {
					"other": "Boolean indicator that other forms of payment are accepted",
					"amazon_payments": "Boolean indicator that Amazon Payments are accepted",
					"credit_card": "Boolean indicator that credit cards are accepted",
					"paypal": "Boolean indicator that Paypal payments are accepted"
				}],
				"fee": "Numeric fee value",
				"required_to": "If the dues are required this indicates what they are required for. May be one of 'join' or 'rsvp'",
				"trial_days": "When present, returns the number of days the group is offering a free trial period for to new members. When not present, this indicates that the group does not offer a trial membership period",
				"required": "true if dues are required",
				"fee_desc": "Description of fee",
				"refund_policy": ["Conditions for refunds", {
					"none": "indicates there is no refund policy",
					"group_closes": "refund applies when the group closes",
					"member_leaves": "refund applies when member leaves the group",
					"member_banned": "refund applies when the member is banned",
					"custom": "Boolean indicator of a custom refund policy"
				}],
				"currency": "Currency fee is declared as"
			}],
			"join_mode": "Who can join this group and how. One of approval, closed, open",
			"city": "City of the group",
			"who": "What the group calls its members",
			"id": "Numeric group ID",
			"timezone": "This represents the universal timezone identifier for the group",
			"list_addr": "Optional field returning list address prefix. List mail will be {list_addr}-list@meetup.com. Announce email will be {list_addr}-announce@meetup.com. You must be a member of the group to see this",
			"created": "Time the group was created in milliseconds since the epoch",
			"description": "Short description of group",
			"name": "Name of the group",
			"ga_code": "Optional field return the Google Analytics code for the group. Only members that can edit group settings can see this",
			"urlname": "Urlname used to identify the group on meetup.com",
			"members": "Number of Meetup members in this group",
			"lat": "Latitude",
			"list_mode": "Optional fields parameter representing the policy for who can post the group mailing list. One of moderated, off, open, orgs_only",
			"lon": "Longitude",
			"join_info": ["Optional field, lists any questions requested when joining and required fields", {
				"questions": ["List of questions asked by organizer", {
					"id": "Unique identifier for the question",
					"question": "The text of the question"
				}],
				"intro_required": "true if required, false otherwise",
				"questions_req": "true if required, false otherwise",
				"photo_required": "true if required, false otherwise"
			}],
			"organizer": ["Group's primary organizer", {
				"id": "Numeric member ID",
				"bio": "Bio of member",
				"name": "Name of member"
			}],
			"short_link": "Optional field, a shorted URL for the group",
			"country": "Country of the group",
			"photos": ["A small set of photos from the group", {
				"id": "Numeric photo ID",
				"photo_link": "Link for standard sized photo",
				"highres_link": "Link for full sized photo",
				"thumb_link": "Link for thumbnail sized photo"
			}],
			"topics": ["Optional fields parameter. Returns the group's topics", {
				"id": "Numeric topic id",
				"urlkey": "The unique keyword used to identify this topic",
				"name": "Display name of the topic",
				"lang": "Language topic originates from"
			}],
			"category": ["The primary category of the group, if the group has one", {
				"id": "Numeric category id",
				"name": "Display name of the category",
				"shortname": "String identifier of the category"
			}],
			"welcome_message": "Optional fields parameter. Returns the Group's default welcome message if the authenticated member is the organizer of the group",
			"group_photo": ["Group photo", {
				"id": "Numeric photo ID",
				"photo_link": "Link for standard sized photo",
				"highres_link": "Link for full sized photo",
				"thumb_link": "Link for thumbnail sized photo"
			}],
			"simple_html_description": "Description of the group, in simple HTML source format. If this group's description was saved in simple HTML format, the description field will be an HTML translation of this source"
		},
		"scopes": ["basic"],
		"name": "Group Edit",
		"path": "\/:urlname",
		"response_notes": "A successful response will include a representation of the updated group as a JSON object",
		"group": "groups"
	}, {
		"desc": "Associates topics with a given Meetup Group. Limited to organizers of the group.",
		"param_notes": "A group can have at most 15 topics",
		"tag": "add",
		"params": {
			"*topic_id": "Comma-delimited list of topic ids to associate with group"
		},
		"api_version": "3",
		"formats": ["json"],
		"http_method": "POST",
		"response": {
			"is_simplehtml": "Optional field, 'true' when the group description has been saved in a simplified HTML format, 'false' otherwise.",
			"visibility": "Who can see this group. One of members, public or public_limited",
			"link": "Link to group on meetup.com",
			"next_event": ["The next upcoming event, if the group has one", {
				"id": "Alphanumeric event ID",
				"time": "UTC start time of the event, in milliseconds since the epoch",
				"name": "Name of event"
			}],
			"state": "State of the group, if in US or Canada",
			"self": ["Optional field, contains details specific to the authorized user if an active member of this group", {
				"visited": "Member's last visit to the group site, in milliseconds since the epoch",
				"status": "Optional fields property returned when 'self_status' is provided. Indicates the authorized user's membership with this group. Value may be one of pending, pending_payment, active, blocked or none",
				"role": "Member's role in group, if any: Organizer, Assistant Organizer, Event Organizer, etc.",
				"actions": "list of actions the current user may perform, potentially \"event_create\": the ability to create new events, \"event_draft\": the ability to save new events as drafts, \"role_assign\": the ability to assign member roles, or \"edit\": the ability to edit group settings"
			}],
			"similar_groups": ["Optional fields parameter. Returns up to 5 groups similar to this groups", {
				"id": "Id of the group",
				"photos": ["Optional fields parameter. A small set of photos from the group", {
					"id": "Numeric photo ID",
					"photo_link": "Link for standard sized photo",
					"highres_link": "Link for full sized photo",
					"thumb_link": "Link for thumbnail sized photo"
				}],
				"lon": "Longitude",
				"name": "Name of the group",
				"join_mode": "Who can join this group and how. One of approval, closed, open",
				"urlname": "Urlname used to identify the group on meetup.com",
				"lat": "Latitude",
				"who": "What this group calls it's members"
			}],
			"membership_dues": ["Optional field, returns membership dues for group if any", {
				"methods": ["Methods of payments", {
					"other": "Boolean indicator that other forms of payment are accepted",
					"amazon_payments": "Boolean indicator that Amazon Payments are accepted",
					"credit_card": "Boolean indicator that credit cards are accepted",
					"paypal": "Boolean indicator that Paypal payments are accepted"
				}],
				"fee": "Numeric fee value",
				"required_to": "If the dues are required this indicates what they are required for. May be one of 'join' or 'rsvp'",
				"trial_days": "When present, returns the number of days the group is offering a free trial period for to new members. When not present, this indicates that the group does not offer a trial membership period",
				"required": "true if dues are required",
				"fee_desc": "Description of fee",
				"refund_policy": ["Conditions for refunds", {
					"none": "indicates there is no refund policy",
					"group_closes": "refund applies when the group closes",
					"member_leaves": "refund applies when member leaves the group",
					"member_banned": "refund applies when the member is banned",
					"custom": "Boolean indicator of a custom refund policy"
				}],
				"currency": "Currency fee is declared as"
			}],
			"join_mode": "Who can join this group and how. One of approval, closed, open",
			"city": "City of the group",
			"who": "What the group calls its members",
			"id": "Numeric group ID",
			"timezone": "This represents the universal timezone identifier for the group",
			"list_addr": "Optional field returning list address prefix. List mail will be {list_addr}-list@meetup.com. Announce email will be {list_addr}-announce@meetup.com. You must be a member of the group to see this",
			"created": "Time the group was created in milliseconds since the epoch",
			"description": "Short description of group",
			"name": "Name of the group",
			"ga_code": "Optional field return the Google Analytics code for the group. Only members that can edit group settings can see this",
			"urlname": "Urlname used to identify the group on meetup.com",
			"members": "Number of Meetup members in this group",
			"lat": "Latitude",
			"list_mode": "Optional fields parameter representing the policy for who can post the group mailing list. One of moderated, off, open, orgs_only",
			"lon": "Longitude",
			"join_info": ["Optional field, lists any questions requested when joining and required fields", {
				"questions": ["List of questions asked by organizer", {
					"id": "Unique identifier for the question",
					"question": "The text of the question"
				}],
				"intro_required": "true if required, false otherwise",
				"questions_req": "true if required, false otherwise",
				"photo_required": "true if required, false otherwise"
			}],
			"organizer": ["Group's primary organizer", {
				"id": "Numeric member ID",
				"bio": "Bio of member",
				"name": "Name of member"
			}],
			"short_link": "Optional field, a shorted URL for the group",
			"country": "Country of the group",
			"photos": ["A small set of photos from the group", {
				"id": "Numeric photo ID",
				"photo_link": "Link for standard sized photo",
				"highres_link": "Link for full sized photo",
				"thumb_link": "Link for thumbnail sized photo"
			}],
			"topics": ["Optional fields parameter. Returns the group's topics", {
				"id": "Numeric topic id",
				"urlkey": "The unique keyword used to identify this topic",
				"name": "Display name of the topic",
				"lang": "Language topic originates from"
			}],
			"category": ["The primary category of the group, if the group has one", {
				"id": "Numeric category id",
				"name": "Display name of the category",
				"shortname": "String identifier of the category"
			}],
			"welcome_message": "Optional fields parameter. Returns the Group's default welcome message if the authenticated member is the organizer of the group",
			"group_photo": ["Group photo", {
				"id": "Numeric photo ID",
				"photo_link": "Link for standard sized photo",
				"highres_link": "Link for full sized photo",
				"thumb_link": "Link for thumbnail sized photo"
			}],
			"simple_html_description": "Description of the group, in simple HTML source format. If this group's description was saved in simple HTML format, the description field will be an HTML translation of this source"
		},
		"scopes": ["basic"],
		"name": "Group Topics Add",
		"path": "\/:urlname\/topics",
		"response_notes": "A successful response will include a representation of the group topics were added to",
		"group": "groups"
	}, {
		"desc": "Associates topics with a given Meetup Group. Limited to organizers of the group.",
		"param_notes": "Groups must have at one topic. Attempts to remove all topics will result in a failed request",
		"tag": "remove",
		"params": {
			"*topic_id": "Comma-delimited list of topic ids to disassociate with group"
		},
		"api_version": "3",
		"formats": ["json"],
		"http_method": "DELETE",
		"response": {
			"is_simplehtml": "Optional field, 'true' when the group description has been saved in a simplified HTML format, 'false' otherwise.",
			"visibility": "Who can see this group. One of members, public or public_limited",
			"link": "Link to group on meetup.com",
			"next_event": ["The next upcoming event, if the group has one", {
				"id": "Alphanumeric event ID",
				"time": "UTC start time of the event, in milliseconds since the epoch",
				"name": "Name of event"
			}],
			"state": "State of the group, if in US or Canada",
			"self": ["Optional field, contains details specific to the authorized user if an active member of this group", {
				"visited": "Member's last visit to the group site, in milliseconds since the epoch",
				"status": "Optional fields property returned when 'self_status' is provided. Indicates the authorized user's membership with this group. Value may be one of pending, pending_payment, active, blocked or none",
				"role": "Member's role in group, if any: Organizer, Assistant Organizer, Event Organizer, etc.",
				"actions": "list of actions the current user may perform, potentially \"event_create\": the ability to create new events, \"event_draft\": the ability to save new events as drafts, \"role_assign\": the ability to assign member roles, or \"edit\": the ability to edit group settings"
			}],
			"similar_groups": ["Optional fields parameter. Returns up to 5 groups similar to this groups", {
				"id": "Id of the group",
				"photos": ["Optional fields parameter. A small set of photos from the group", {
					"id": "Numeric photo ID",
					"photo_link": "Link for standard sized photo",
					"highres_link": "Link for full sized photo",
					"thumb_link": "Link for thumbnail sized photo"
				}],
				"lon": "Longitude",
				"name": "Name of the group",
				"join_mode": "Who can join this group and how. One of approval, closed, open",
				"urlname": "Urlname used to identify the group on meetup.com",
				"lat": "Latitude",
				"who": "What this group calls it's members"
			}],
			"membership_dues": ["Optional field, returns membership dues for group if any", {
				"methods": ["Methods of payments", {
					"other": "Boolean indicator that other forms of payment are accepted",
					"amazon_payments": "Boolean indicator that Amazon Payments are accepted",
					"credit_card": "Boolean indicator that credit cards are accepted",
					"paypal": "Boolean indicator that Paypal payments are accepted"
				}],
				"fee": "Numeric fee value",
				"required_to": "If the dues are required this indicates what they are required for. May be one of 'join' or 'rsvp'",
				"trial_days": "When present, returns the number of days the group is offering a free trial period for to new members. When not present, this indicates that the group does not offer a trial membership period",
				"required": "true if dues are required",
				"fee_desc": "Description of fee",
				"refund_policy": ["Conditions for refunds", {
					"none": "indicates there is no refund policy",
					"group_closes": "refund applies when the group closes",
					"member_leaves": "refund applies when member leaves the group",
					"member_banned": "refund applies when the member is banned",
					"custom": "Boolean indicator of a custom refund policy"
				}],
				"currency": "Currency fee is declared as"
			}],
			"join_mode": "Who can join this group and how. One of approval, closed, open",
			"city": "City of the group",
			"who": "What the group calls its members",
			"id": "Numeric group ID",
			"timezone": "This represents the universal timezone identifier for the group",
			"list_addr": "Optional field returning list address prefix. List mail will be {list_addr}-list@meetup.com. Announce email will be {list_addr}-announce@meetup.com. You must be a member of the group to see this",
			"created": "Time the group was created in milliseconds since the epoch",
			"description": "Short description of group",
			"name": "Name of the group",
			"ga_code": "Optional field return the Google Analytics code for the group. Only members that can edit group settings can see this",
			"urlname": "Urlname used to identify the group on meetup.com",
			"members": "Number of Meetup members in this group",
			"lat": "Latitude",
			"list_mode": "Optional fields parameter representing the policy for who can post the group mailing list. One of moderated, off, open, orgs_only",
			"lon": "Longitude",
			"join_info": ["Optional field, lists any questions requested when joining and required fields", {
				"questions": ["List of questions asked by organizer", {
					"id": "Unique identifier for the question",
					"question": "The text of the question"
				}],
				"intro_required": "true if required, false otherwise",
				"questions_req": "true if required, false otherwise",
				"photo_required": "true if required, false otherwise"
			}],
			"organizer": ["Group's primary organizer", {
				"id": "Numeric member ID",
				"bio": "Bio of member",
				"name": "Name of member"
			}],
			"short_link": "Optional field, a shorted URL for the group",
			"country": "Country of the group",
			"photos": ["A small set of photos from the group", {
				"id": "Numeric photo ID",
				"photo_link": "Link for standard sized photo",
				"highres_link": "Link for full sized photo",
				"thumb_link": "Link for thumbnail sized photo"
			}],
			"topics": ["Optional fields parameter. Returns the group's topics", {
				"id": "Numeric topic id",
				"urlkey": "The unique keyword used to identify this topic",
				"name": "Display name of the topic",
				"lang": "Language topic originates from"
			}],
			"category": ["The primary category of the group, if the group has one", {
				"id": "Numeric category id",
				"name": "Display name of the category",
				"shortname": "String identifier of the category"
			}],
			"welcome_message": "Optional fields parameter. Returns the Group's default welcome message if the authenticated member is the organizer of the group",
			"group_photo": ["Group photo", {
				"id": "Numeric photo ID",
				"photo_link": "Link for standard sized photo",
				"highres_link": "Link for full sized photo",
				"thumb_link": "Link for thumbnail sized photo"
			}],
			"simple_html_description": "Description of the group, in simple HTML source format. If this group's description was saved in simple HTML format, the description field will be an HTML translation of this source"
		},
		"scopes": ["basic"],
		"name": "Group Topics Add",
		"path": "\/:urlname\/topics",
		"response_notes": "A successful response will include a representation of the group topics were removed from",
		"group": "groups"
	}, {
		"response": {
			"id": "A unique identifier for a notification",
			"text": "Notification content as text",
			"link": "Link to resource notification was triggered by",
			"photo": ["A photo related to the notifications. Potentially absent", {
				"id": "Numeric photo ID",
				"photo_link": "Link for standard sized photo",
				"highres_link": "Link for full sized photo",
				"thumb_link": "Link for thumbnail sized photo"
			}],
			"kind": "Identifier indicating the kind of notification"
		},
		"http_method": "GET",
		"scopes": ["basic"],
		"desc": "Returns all recent Meetup notifications for the authorized member. To mark notifications read use [\/notifications\/read](\/meetup_api\/docs\/notifications\/read\/) endpoint. To get the authenticated Member's current unread count, request it in an [HTTP header](\/meetup_api\/docs\/#meta-headers).",
		"param_notes": "No parameters are required",
		"name": "Notifications",
		"path": "\/notifications",
		"response_notes": "The response includes a JSON-encoded list of current notification items.",
		"group": "notifications",
		"api_version": "3"
	}, {
		"response": {
			"id": "A unique identifier for a notification",
			"text": "Notification content as text",
			"link": "Link to resource notification was triggered by",
			"photo": ["A photo related to the notifications. Potentially absent", {
				"id": "Numeric photo ID",
				"photo_link": "Link for standard sized photo",
				"highres_link": "Link for full sized photo",
				"thumb_link": "Link for thumbnail sized photo"
			}],
			"kind": "Identifier indicating the kind of notification"
		},
		"http_method": "POST",
		"scopes": ["basic"],
		"desc": "Marks groups of [notifications](\/meetup_api\/docs\/notifications\/) as read.",
		"name": "Read Notifications",
		"path": "\/notifications\/read",
		"response_notes": "The response includes a JSON-encoded list of current notification items",
		"params": {
			"since_id": "The id of the newest notification item, typically the first in the list returned by the notifications endpoint"
		},
		"group": "notifications",
		"api_version": "3"
	}, {
		"response": {
			"id": "Numeric topic id",
			"urlkey": "The unique keyword used to identify this topic",
			"name": "Display name of the topic",
			"lang": "Language topic originates from"
		},
		"http_method": "GET",
		"scopes": ["basic"],
		"desc": "Recommends suggestions for group topics based on a text search and optionally other topics",
		"name": "Recommend Group Topics",
		"path": "\/recommended\/group_topics",
		"response_notes": "Returns list of topic object",
		"params": {
			"page": "Target number of recommendations to return. defaults to 36",
			"other_topics": "A comma-delimited list of topic id's to inform recommendations",
			"*text": "Free form text search",
			"lang": "Defines a language preference for ordering results. Valid values are frptitdeesen_us. You may also substitute this with the Accept-Language header"
		},
		"group": "topics",
		"api_version": "3",
		"formats": ["json"]
	}, {
		"response": {
			"is_simplehtml": "Optional field, 'true' when the group description has been saved in a simplified HTML format, 'false' otherwise.",
			"visibility": "Who can see this group. One of members, public or public_limited",
			"link": "Link to group on meetup.com",
			"next_event": ["The next upcoming event, if the group has one", {
				"id": "Alphanumeric event ID",
				"time": "UTC start time of the event, in milliseconds since the epoch",
				"name": "Name of event"
			}],
			"state": "State of the group, if in US or Canada",
			"self": ["Optional field, contains details specific to the authorized user if an active member of this group", {
				"visited": "Member's last visit to the group site, in milliseconds since the epoch",
				"status": "Optional fields property returned when 'self_status' is provided. Indicates the authorized user's membership with this group. Value may be one of pending, pending_payment, active, blocked or none",
				"role": "Member's role in group, if any: Organizer, Assistant Organizer, Event Organizer, etc.",
				"actions": "list of actions the current user may perform, potentially \"event_create\": the ability to create new events, \"event_draft\": the ability to save new events as drafts, \"role_assign\": the ability to assign member roles, or \"edit\": the ability to edit group settings"
			}],
			"similar_groups": ["Optional fields parameter. Returns up to 5 groups similar to this groups", {
				"id": "Id of the group",
				"photos": ["Optional fields parameter. A small set of photos from the group", {
					"id": "Numeric photo ID",
					"photo_link": "Link for standard sized photo",
					"highres_link": "Link for full sized photo",
					"thumb_link": "Link for thumbnail sized photo"
				}],
				"lon": "Longitude",
				"name": "Name of the group",
				"join_mode": "Who can join this group and how. One of approval, closed, open",
				"urlname": "Urlname used to identify the group on meetup.com",
				"lat": "Latitude",
				"who": "What this group calls it's members"
			}],
			"membership_dues": ["Optional field, returns membership dues for group if any", {
				"methods": ["Methods of payments", {
					"other": "Boolean indicator that other forms of payment are accepted",
					"amazon_payments": "Boolean indicator that Amazon Payments are accepted",
					"credit_card": "Boolean indicator that credit cards are accepted",
					"paypal": "Boolean indicator that Paypal payments are accepted"
				}],
				"fee": "Numeric fee value",
				"required_to": "If the dues are required this indicates what they are required for. May be one of 'join' or 'rsvp'",
				"trial_days": "When present, returns the number of days the group is offering a free trial period for to new members. When not present, this indicates that the group does not offer a trial membership period",
				"required": "true if dues are required",
				"fee_desc": "Description of fee",
				"refund_policy": ["Conditions for refunds", {
					"none": "indicates there is no refund policy",
					"group_closes": "refund applies when the group closes",
					"member_leaves": "refund applies when member leaves the group",
					"member_banned": "refund applies when the member is banned",
					"custom": "Boolean indicator of a custom refund policy"
				}],
				"currency": "Currency fee is declared as"
			}],
			"join_mode": "Who can join this group and how. One of approval, closed, open",
			"city": "City of the group",
			"who": "What the group calls its members",
			"id": "Numeric group ID",
			"timezone": "This represents the universal timezone identifier for the group",
			"list_addr": "Optional field returning list address prefix. List mail will be {list_addr}-list@meetup.com. Announce email will be {list_addr}-announce@meetup.com. You must be a member of the group to see this",
			"created": "Time the group was created in milliseconds since the epoch",
			"description": "Short description of group",
			"name": "Name of the group",
			"ga_code": "Optional field return the Google Analytics code for the group. Only members that can edit group settings can see this",
			"urlname": "Urlname used to identify the group on meetup.com",
			"members": "Number of Meetup members in this group",
			"lat": "Latitude",
			"list_mode": "Optional fields parameter representing the policy for who can post the group mailing list. One of moderated, off, open, orgs_only",
			"lon": "Longitude",
			"join_info": ["Optional field, lists any questions requested when joining and required fields", {
				"questions": ["List of questions asked by organizer", {
					"id": "Unique identifier for the question",
					"question": "The text of the question"
				}],
				"intro_required": "true if required, false otherwise",
				"questions_req": "true if required, false otherwise",
				"photo_required": "true if required, false otherwise"
			}],
			"organizer": ["Group's primary organizer", {
				"id": "Numeric member ID",
				"bio": "Bio of member",
				"name": "Name of member"
			}],
			"short_link": "Optional field, a shorted URL for the group",
			"country": "Country of the group",
			"photos": ["A small set of photos from the group", {
				"id": "Numeric photo ID",
				"photo_link": "Link for standard sized photo",
				"highres_link": "Link for full sized photo",
				"thumb_link": "Link for thumbnail sized photo"
			}],
			"topics": ["Optional fields parameter. Returns the group's topics", {
				"id": "Numeric topic id",
				"urlkey": "The unique keyword used to identify this topic",
				"name": "Display name of the topic",
				"lang": "Language topic originates from"
			}],
			"category": ["The primary category of the group, if the group has one", {
				"id": "Numeric category id",
				"name": "Display name of the category",
				"shortname": "String identifier of the category"
			}],
			"welcome_message": "Optional fields parameter. Returns the Group's default welcome message if the authenticated member is the organizer of the group",
			"group_photo": ["Group photo", {
				"id": "Numeric photo ID",
				"photo_link": "Link for standard sized photo",
				"highres_link": "Link for full sized photo",
				"thumb_link": "Link for thumbnail sized photo"
			}],
			"simple_html_description": "Description of the group, in simple HTML source format. If this group's description was saved in simple HTML format, the description field will be an HTML translation of this source"
		},
		"http_method": "GET",
		"scopes": ["basic"],
		"desc": "Returns groups Meetup finds relevant to you",
		"param_notes": "All parameters are optional. You may change the 'location' and 'radius' for the request. If you do not supply a location your request will be based on your IP's geographic location. If the server is unable to produce recommendations in a suitable amount of time, a 503 error will be returned.",
		"name": "Recommended Groups",
		"path": "\/recommended\/groups",
		"params": {
			"zip": "Zip code you are searching for recommendations in",
			"category": "A valid category id which limits recommended groups to a particular category",
			"lon": "Approximate longitude",
			"location": "Raw text location query",
			"radius": "Radius in miles. May be 0.0-100.0, 'global' or 'smart', a dynamic radius based on the number of active groups in the area",
			"topic_id": "Comma delimited list of up to 100 topic ids to help inform recommendations",
			"lat": "Approximate latitude",
			"country": "A valid two character country code, defaults to US",
			"fields": "Request that additional fields (separated by commas) be included in the output."
		},
		"group": "groups",
		"api_version": "3",
		"formats": ["json"]
	}, {
		"response": {
			"zip": "If available, the venue's zipcode",
			"phone": "If available, the venue's photo number",
			"lon": "If available, the venue's longitude",
			"address_3": "If available, the third address line of the venue",
			"visibility": "'private' if this venue is a private home, otherwise 'public'",
			"state": "If available and the venue's country id within the US or Canada, the venue's state",
			"address_1": "If available, the first address line of the venue",
			"address_2": "If available, the second address line of the venue",
			"country": "If available, the name of the venue's country code",
			"city": "If available, the name of the venue's city",
			"id": "ID, of the venue",
			"name": "If available, the venue's name",
			"lat": "If available, the venue's latitude"
		},
		"http_method": "GET",
		"scopes": ["basic"],
		"desc": "Returns venues Meetup finds relevant to you based on location and category. This method does not yet support sorting or pagination.",
		"param_notes": "All parameters are optional. If you do not supply a location your request will be based on your IP's geographic location. If the server is unable to produce recommendations in a suitable amount of time, a 503 error will be returned.",
		"name": "Recommended Venues",
		"path": "\/recommended\/venues",
		"params": {
			"zip": "Zip code you are searching for recommendations in",
			"category": "Comma-delimited list of up to 200 category ids to help inform recommendations",
			"lon": "Approximate longitude",
			"location": "Raw text location query",
			"group_urlname": "Comma-delimited list of up to 200 group urlnames to help inform recommendations",
			"group_id": "Comma-delimited list of up to 200 group ids to help inform recommendations",
			"radius": "Radius in miles",
			"used_between": "Return venues that have been used within the given time range, defined by two times separated with a single comma. Each end of the range may be specified with relative dates, such as \"1m\" for one month from now, or by absolute time in milliseconds since the epoch. If an endpoint is omitted, the range is unbounded on that end. The default value is unbounded on both ends (though restricted to the search window described above).",
			"lat": "Approximate latitude",
			"min_groups": "The minimum number of groups that have hosted events at this venue",
			"country": "A valid two character country code, defaults to US"
		},
		"group": "venues",
		"api_version": "3",
		"formats": ["json"]
	}, {
		"response": {
			"message": "A human displayable message",
			"status": "May be one of 'ok', 'notice', or 'unavailable'"
		},
		"http_method": "GET",
		"scopes": ["basic"],
		"desc": "Returns the current API service status",
		"param_notes": "No parameters are needed",
		"name": "API Status",
		"path": "\/status",
		"response_notes": "Returns a JSON-encoded object reprsenting the current API service status",
		"group": "meta",
		"api_version": "3",
		"formats": ["json"]
	}, {
		"desc": "Interface for creating new Meetup venues",
		"param_notes": "The :urlname path element may be any valid group urlname or domain name. The required parameters are highlighted below. To avoid creating duplicate Meetup venues, this endpoint will attempt to resolve potentially similar venues based on name and address before creating a new public venues. If potential matches are detected, this method will return a 409 Conflict response containing a list of potential matches",
		"tag": "create",
		"params": {
			"*state": "If in the US or CA, the state code for the venue",
			"phone": "Optional phone number for the venue",
			"visibility": "Optional value indicating the venues visibility to others. May be one of private or public. Defaults to 'public'",
			"hours": "Open hours information about the venue",
			"*city": "City name of the venue",
			"web_url": "Optional web url for the venue",
			"*country": "2 character country code of the venue",
			"*name": "Unique name of the venue",
			"address_2": "Secondary address info",
			"*address_1": "Primary address of the venue"
		},
		"api_version": "3",
		"formats": ["json"],
		"response": {
			"zip": "If available, the venue's zipcode",
			"phone": "If available, the venue's photo number",
			"lon": "If available, the venue's longitude",
			"address_3": "If available, the third address line of the venue",
			"visibility": "'private' if this venue is a private home, otherwise 'public'",
			"state": "If available and the venue's country id within the US or Canada, the venue's state",
			"address_1": "If available, the first address line of the venue",
			"address_2": "If available, the second address line of the venue",
			"country": "If available, the name of the venue's country code",
			"city": "If available, the name of the venue's city",
			"id": "ID, of the venue",
			"name": "If available, the venue's name",
			"lat": "If available, the venue's latitude"
		},
		"http_method": "POST",
		"scopes": ["basic"],
		"name": "Venue Create",
		"path": "\/:urlname\/venues",
		"group": "venues"
	}, {
		"http_method": "POST",
		"scopes": ["basic"],
		"desc": "Add yourself to an event watch list to get notified when a spot becomes available",
		"param_notes": "No parameters are required. You should only call this method if you request the fields parameter 'self' in any events methods and get back a self.actions field containing 'watch'",
		"tag": "create",
		"name": "Watchlist add",
		"path": "\/:urlname\/events\/:id\/watchlist",
		"response_notes": "A successful add will result in the json message {\"status\":\"watching\"}",
		"group": "events",
		"api_version": "3",
		"formats": ["json"]
	}, {
		"http_method": "DELETE",
		"scopes": ["basic"],
		"desc": "Remove yourself from an event watch list",
		"param_notes": "No parameters are required. You should only call this method if you request the fields parameter 'self' in any events methods and get back a self.actions field containing 'unwatch'",
		"tag": "delete",
		"name": "Watchlist remove",
		"path": "\/:urlname\/events\/:id\/watchlist",
		"response_notes": "A successful watchlist removal will result in the json message {\"status\":\"not_watching\"}. You may optionally send a fields parameter with the value of \"self\" to fetch rsvp_actions for the authenticated member",
		"group": "events",
		"api_version": "3",
		"formats": ["json"]
	}]
}
