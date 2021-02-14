__User Story 1__\
Description: As a user, I can see events and reminders for at least 5 years in past from the today’s date.

Test strategy:
1. Will be tested in the test_get_upcoming_events_number method.
2. Using patch, the api for the google calendar api is mocked.
3. Set the time to be used in the function to obtain the event to the time on the local device
4. Call Calendar.get_all_events
5. Set assert to see if the function is called
6. Set the function to see if the number of events returned is the same as set
7. Check if the argument for timeMin is 5 years from now

__User Story 2__\
Description: As a user, I can see events and reminders for at least next two years (in future).

Test strategy:
1. Will be tested in the test_get_upcoming_events_number method.
2. Using patch, the api for the google calendar api is mocked.
3. Set the time to be used in the function to obtain the event to the time on the local device
4. Call Calendar.get_all_events
5. Set assert to see if the function is called
6. Set the function to see if the number of events returned is the same as set
7. Check if the argument for timeMax is 2 years in the future

__User Story 3__\
Description: As a user, I can navigate through different days, months, and years in the calendar so that I can view the details of events. For example, if the year 2019 is selected, all eventsand reminders (and any other information associated to the event) will be shown. This means on selecting the specific event or reminder I can see the detailed information.

Test Strategy:
1. Will be tested in the test_get_upcoming_events_number method.
2. Using patch, the api for the google calendar api is mocked.
3. Set the time to be used in the function to obtain the event to the time on the local device
4. Call Calendar.get_all_events
5. Set assert to see if the function is called
6. Set the function to see if the number of events returned is the same as set
7. Check if the argument for timeMin is 5 years from now

__User Story 4__\
Description: As a user, I can search events and reminders using different key words.

Test Strategy:
1. Mock api, time_now and search_term for the events gathered
2. Call Calendar.search_all_events using the mocked variables
3. Check if mock_api.events.return_value.list.call_args_list[kwargs]['q'] is equal to the mocked search term
4. If it is the same then, the Calendar searches for the required events

__User Story 5__\
Description: 5.As a user, I can delete events and reminders. 

Test Strategy:
1. Will be tested in test_delete_events method.
2. Using Calendar.api and time now a dummy event is added using the mock_api.events().quickAdd() method
3. the Calendar.delete_event is then called to delete the dummy event from the calendar
4. Using the Calendar.api and the time now to retrieve the updated events
5. The updated events is compared to see if the deleted event is deleted by using assertNotEqual

__User Story 6__\
Description: As a user, I can edit events and reminders.

Test Strategy: 
1. Mock api and time is used with Calendar.get_all_events to simulate retrieving the events
2. The return values for the event is set
3. The changed event is predicted by events[option-1]
4. mock_api.events.return_value.update.call_args_list[0] is called to retrieve the args, kwargs
5. Check if the function Calendar.edit_event() is called by comparing self.assertEqual(kwargs['eventId'], predicted_event['id'])
6. The edited event is then check if it is udpated to the calendar by comparing the events['summary'] and the updated events['summary']
7. The event is then deleted using Calendar.delete_event(mock_api, event['id'])

__User Story 7__\
Description: As a user, I can cancel events and reminders

Test Strategy:
1. Will be tested in test_cancel_events method
2. Using Calendar.api and time now a dummy event is added using the mock_api.events().quickAdd() method
3. The Calendar.cancel_event(mock_api, a_event['id']) method is called to cancel the dummy event
4. The updated calendar is then called using Calendar.get_all_events(mock_api, time_now)
5. From the updated calendar the cancelled event is the check if it is still on the calendar

