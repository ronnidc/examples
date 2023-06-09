import { render, fireEvent, screen } from '@testing-library/vue';
import axios from 'axios';
import { useStore } from 'vuex';
import marketingPermissions from 'multisite/components/checkout/marketingPermissions.vue';

jest.mock('axios');
jest.mock('vuex');

beforeEach(() => {
    useStore.mockReturnValue({
        dispatch: jest.fn(),
        getters: {
            getBasket: jest.fn()
        }
    });
});

describe('marketingPermissions.vue', () => {
	const props = {
		vm: {
			BaseViewModel: {
				Language: "en-AU",
				ChannelsViewModel: {
					Enabled: true,
					Header: "Select how to receive information",
					ErrorMessage: "Please select at least one option before proceeding.",
					ConsentUrl: "/checkout/marketing-permission/",
					AdditionalConsentInformation: "Multisite SFDC Additional info",
					Channels: [
						{
							Value: "Email",
							Label: "Email",
							Accepted: true
						},
						{
							Value: "Phone",
							Label: "Phone",
							Accepted: false
						},
						{
							Value: "Sms",
							Label: "Text message",
							Accepted: true
						}
					]
				},
			},
			CurrentPage: {
				KeepInformedButtonText: "Keep me informed",
				SkipToNextPageButtonText: "Skip",
			}
		}
	};

	it('renders without crashing', () => {
		render(marketingPermissions, { props });
	});

	it('renders channels header correctly', () => {
		render(marketingPermissions, { props });
		expect(screen.getByText(props.vm.BaseViewModel.ChannelsViewModel.Header)).toBeInTheDocument();
	});

	it('shows error message when no channels selected', async () => {
		const modifiedProps = { ...props };
		modifiedProps.vm.BaseViewModel.ChannelsViewModel.Channels = modifiedProps.vm.BaseViewModel.ChannelsViewModel.Channels.map(channel => ({
			...channel,
			Accepted: false,
		}));

		render(marketingPermissions, { props: modifiedProps });

		const optInButton = screen.getByText(props.vm.CurrentPage.KeepInformedButtonText);
		await fireEvent.click(optInButton);

		expect(screen.getByText(props.vm.BaseViewModel.ChannelsViewModel.ErrorMessage)).toBeInTheDocument();
	});

	it('calls axios.post with correct data on accept', async () => {
		render(marketingPermissions, { props });

		// Simulate user selecting a channel
		const checkbox = screen.getByText('Email');
		await fireEvent.click(checkbox);

		const optInButton = screen.getByText(props.vm.CurrentPage.KeepInformedButtonText);
		await fireEvent.click(optInButton);

		const expectedData = {
			Channels: props.vm.BaseViewModel.ChannelsViewModel.Channels.map(channel => ({
				Value: channel.Value,
				Accepted: channel.Value === 'Email' ? true : false,
			})),
			Language: props.vm.BaseViewModel.Language,
			ConsentUrl: props.vm.BaseViewModel.ChannelsViewModel.ConsentUrl,
			AdditionalConsentInformation: props.vm.BaseViewModel.ChannelsViewModel.AdditionalConsentInformation,
		};

		expect(axios.post).toHaveBeenCalledWith('/api/global-checkout/marketing-permissions/accept', expectedData);
	});

	it('calls axios.post with correct data on decline', async () => {
		render(marketingPermissions, { props });
		const optOutButton = screen.getByText(props.vm.CurrentPage.SkipToNextPageButtonText);
		await fireEvent.click(optOutButton);

		const expectedData = {
			Channels: props.vm.BaseViewModel.ChannelsViewModel.Channels.map(channel => ({
				Value: channel.Value,
				Accepted: false,
			})),
			Language: props.vm.BaseViewModel.Language,
			ConsentUrl: props.vm.BaseViewModel.ChannelsViewModel.ConsentUrl,
			AdditionalConsentInformation: props.vm.BaseViewModel.ChannelsViewModel.AdditionalConsentInformation,
		};

		expect(axios.post).toHaveBeenCalledWith('/api/global-checkout/marketing-permissions/decline', expectedData);
	});
});
