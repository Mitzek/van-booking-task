
import BookingCalendar from "../components/calendar/BookingCalendar.vue"
import { mount } from '@vue/test-utils';

describe('BookingCalendar', () => {
    it('should render a loading screen for StationSelector', () => {
        const wrapper = mount(BookingCalendar, {
            data () {
                return {
                    stations: undefined
                }
                
            }
        });

    expect(wrapper.html()).toContain('Loading...')
    });

})


describe('BookingCalendar', () => {
    it('should render a loading screen for FullCalendar', () => {
        const wrapper = mount(BookingCalendar, {
            data () {
                return {
                    getDate: undefined
                }
                
            }
        });

    expect(wrapper.html()).toContain('Loading...')
    });

})

