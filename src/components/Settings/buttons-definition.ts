import { BugIcon } from '../icons/bug';
import { InfoIcon } from '../icons/info';
import { ReloadIcon } from '../icons/reload';
import { SettingButton } from './SettingButton';
import { PolicyModal } from '../modals/policy-modal';
import { CheckUpdatesModal } from '../modals/check-updates-modal';
import { ConfirmModal } from '../modals/confirm-modal';
import { Modal } from '../Modal';
import { DB } from '../../core/DB';
import { Toast } from '../Toast';
import { RecycleIcon } from '../icons/recycle';

export const openIssuesPage = () => {
   window.open('https://github.com/andrew1931/pdf-reader/issues');
};

export const settingsButtons = {
   // auth: SettingButton({
   //    label: routes.auth.label,
   //    icon: routes.auth.icon,
   //    iconColor: "text-emerald-500",
   //    action: () => {
   //       navigate(routes.auth.pathname + routes.auth.search);
   //    }
   // }),
   report: SettingButton({
      label: 'Report an issue',
      icon: BugIcon,
      iconColor: 'text-red-500',
      action: openIssuesPage,
   }),
   info: SettingButton({
      label: 'Privacy policy',
      icon: InfoIcon,
      iconColor: 'text-lime-500',
      action: PolicyModal,
   }),
   // sessions: SettingButton({
   //    label: "Active Sessions",
   //    icon: DeviceIcon,
   //    iconColor: "text-blue-500",
   //    action: () => {}
   // }),
   // password: (email: string) => SettingButton({
   //    label: "Change password",
   //    icon: PassIcon,
   //    iconColor: "text-purple-500",
   //    action: () => {
   //       const resetPasswordForm = ResetPasswordForm(() => Modal.hide());
   //       resetPasswordForm.reset();
   //       resetPasswordForm.fillOutEmail(email);
   //       Modal.show(
   //          "Change password",
   //          resetPasswordForm.target
   //       );
   //    }
   // }),
   storage: (labelInfo: HTMLElement) => {
      const settingsButton = SettingButton({
         label: 'Clear cache',
         labelInfo,
         icon: RecycleIcon,
         iconColor: 'text-orange-500',
         action: () => {
            ConfirmModal(
               'Are you positive you want to remove all viewed documents from cache?',
               { label: 'Cancel', fn: () => Modal.hide() },
               {
                  label: 'Clear',
                  fn: () => {
                     settingsButton.disabled = true;
                     DB.clear()
                        .then(() => {
                           Toast.success('Cache was cleared successfully');
                           setTimeout(() => {
                              window.location.reload();
                           }, 1000);
                        })
                        .catch((error) => {
                           settingsButton.disabled = false;
                           Toast.error(error);
                        });
                  },
               }
            );
         },
      });
      return settingsButton;
   },
   updates: SettingButton({
      label: 'Check for updates',
      icon: ReloadIcon,
      iconColor: 'text-yellow-500',
      action: CheckUpdatesModal,
   }),
   // signOut: SettingButton({
   //    label: "Sign out",
   //    icon: ExitIcon,
   //    iconColor: "text-rose-500",
   //    action: () => {
   //       ConfirmModal(
   //          "Are you positive you want to sign out?",
   //          {
   //             label: "Cancel",
   //             fn: Modal.hide,
   //          },
   //          {
   //             label: "Leave",
   //             fn: () =>  {
   //                ClientStorage.removeLSData();
   //                navigate(routes.auth.pathname + routes.auth.search);
   //             }
   //          }
   //       );
   //    }
   // }),
};
