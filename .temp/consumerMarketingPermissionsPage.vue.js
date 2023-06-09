<template>
	<section class="c-profile-page consumer-marketing-permissions-page">
		<div class="c-profile__wrapper no-padding">
			<aside class="c-profile__aside">
				<div class="c-profile__menu">
					<div class="c-profile__aside-title">
						{{ menuHeader }}
					</div>
					<div class="c-profile__aside-subtitle">
						<div class="c-profile__user-login">
							{{ fullName }}
						</div>
						<div class="c-profile__user-email">
							{{ userEmail }}
						</div>
					</div>
					<side-menu :vm="sideMenu" />
				</div>
			</aside>
			<div class="c-profile__container">
				<div class="c-profile__section">
					<section class="consumer-marketing-permissions-page__intro-section">
						<a
							v-if="navigateBackwardLinkUrl"
							:href="navigateBackwardLinkUrl"
							role="back-button"
							class="c-profile__back-link"
						></a>
						<DsText
							v-if="header"
							v-text="header"
							html-element="h1"
							text-style="bold"
							text-type="heading-4xl"
							class="consumer-marketing-permissions-page__heading"
						/>
						<DsText
							v-if="introductionText"
							v-html="introductionText"
							html-element="div"
							text-style="regular"
							text-type="body-lg"
							class="consumer-marketing-permissions-page__introduction"
						/>
						<DsText
							v-if="consentDescription"
							v-html="consentDescription"
							html-element="div"
							text-style="regular"
							text-type="body-lg"
							class="consumer-marketing-permissions-page__description"
						/>
					</section>
					<section class="consumer-marketing-permissions-page__main-section">
						<DsText
							v-if="channelsHeader"
							v-text="channelsHeader"
							html-element="h2"
							text-style="bold"
							text-type="heading-3xl"
							class="consumer-marketing-permissions-page__permission-header"
						/>
						<CheckboxGroup
							v-if="channelsEnabled"
							:items="channelsData"
							:hasError="errorMessage !== ''"
							@update="updateChannel"
						/>
						<div class="consumer-marketing-permissions-page__button">
							<DsButton
								variant="primary"
								size="md"
								:click-handler="updatePermissionStatus"
								v-text="permissionButtonLabel"
							/>
						</div>
					</section>
					<details>
						<summary>
							<code>vm</code> <small>(available props in the ViewModel)</small>
						</summary>
						<pre>{{ vm }}</pre>
					</details>
				</div>
			</div>
		</div>

	</section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { DsText, DsButton } from "coloplast-design-system";
import SideMenu from 'multisite/components/myAccount/sideMenu.vue';
import CheckboxGroup from 'multisite/components/formElements/checkboxGroup.vue';

const props = defineProps({
	vm: Object,
});

const sideMenu = props.vm.BaseViewModel.NavigationViewModel;
const menuHeader = props.vm.BaseViewModel.ParentPageName;
const fullName = props.vm.BaseViewModel.FullName;
const userEmail = props.vm.BaseViewModel.Email;
const navigateBackwardLinkUrl = props.vm.BaseViewModel.NavigateBackwardLinkUrl;
const header = props.vm.CurrentPage.Header;
const introductionText = props.vm.BaseViewModel.IntroductionText;
const consentDescription = props.vm.BaseViewModel.ConsentDescription;

const channelsEnabled = props.vm.BaseViewModel.MarketingPermissionChannelsViewModel.Enabled;
const channelsHeader = props.vm.BaseViewModel.MarketingPermissionChannelsViewModel.Header;
const channelsErrorMessage = props.vm.BaseViewModel.MarketingPermissionChannelsViewModel.ErrorMessage;
const rawChannelsData = props.vm.BaseViewModel.MarketingPermissionChannelsViewModel.Channels;

const channelsData = ref(rawChannelsData.map(channel => ({
	id: channel.Value,
	text: channel.Label,
	checked: channel.Accepted,
})));

const updateChannel = (id, checked) => {
	const channel = channelsData.value.find(channel => channel.id === id);
	if (channel) channel.checked = checked;
};

const errorMessage = ref('');

const isMarketingPermissionsUnset = computed(() => props.vm.BaseViewModel.IsMarketingPermissionsUnset);

const updatePermissionStatus = async () => {
	errorMessage.value = '';

	if (channelsEnabled) {
		const noChannelsSelected = channelsData.value.every(channel => !channel.checked);
		if (noChannelsSelected) {
			errorMessage.value = channelsErrorMessage;
			return;
		}
	} else {
		const allChannelsFalse = channelsData.value.every(channel => !channel.checked);
		const channelsAccepted = allChannelsFalse || isMarketingPermissionsUnset.value ? true : false;
		channelsData.value.forEach(channel => channel.checked = channelsAccepted);
	}

	const url = '/api/consumer-account/marketing-permissions/update';
	const data = {
		Channels: channelsData.value.map(channel => ({
			Value: channel.id,
			Accepted: channel.checked,
		})),
		Language: props.vm.BaseViewModel.Language,
	};

	try {
		await axios.post(url, data);
		window.location.href = props.vm.BaseViewModel.RedirectToUrl;
	} catch (error) {
		console.error(error);
	}
};

const permissionButtonLabel = ref('');

onMounted(() => {
	if (!channelsEnabled) {
		const allChannelsFalse = channelsData.value.every(channel => !channel.checked);
		if (allChannelsFalse || isMarketingPermissionsUnset.value) {
			permissionButtonLabel.value = props.vm.CurrentPage.SaveMarketingPermissionsButtonLabel;
		} else {
			const someChannelsTrue = channelsData.value.some(channel => channel.checked);
			if (someChannelsTrue) {
				permissionButtonLabel.value = props.vm.CurrentPage.WithdrawMarketingPermissionButtonLabel;
			}
		}
	} else {
		permissionButtonLabel.value = props.vm.CurrentPage.SaveMarketingPermissionChannelsButtonLabel;
	}
});

</script>

<style lang="scss" scoped>
@import 'multisite/styles/settings/settings';
@import 'multisite/styles/tools/tools';

.consumer-marketing-permissions-page {

	&__intro-section {
		@include t-respond-to-min('medium') {
			padding-block-end: 24px;
		}
	}

	&__heading {
		margin-block-end: 16px;
		color: ds-color('fg', 'default');
	}

	&__introduction {
		margin-block-end: 24px;
		color: ds-color('fg', 'muted');
	}

	&__description {
		margin-block-end: 24px;
		color: ds-color('fg', 'muted');
	}

	&__main-section {
		@include t-respond-to-min('medium') {
			padding-block-end: 60px;
		}
	}

	&__permission-header {
		margin-block-end: 24px;
		color: ds-color('fg', 'default');
	}

	&__button {
		margin-block-start: 48px;
	}
}
</style>
<style lang="scss">
// unscoped styles:
.consumer-marketing-permissions-page {

	&__introduction,
	&__description {

		p:last-child {
			margin-block-end: 0;
		}
	}

}
</style>
