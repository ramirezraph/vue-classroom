<template>
  <v-card class="mt-0 px-5">
    <v-card-text>
      <base-subheading subheading="Edit Profile" />
      <v-card
        v-if="user"
        flat
        class="pa-3"
      >
        <v-row class="d-block">
          <div class="d-block d-flex mt-6 align-center">
            <div>
              <v-avatar
                size="128"
                style="border: 1px solid lightgray"
              >
                <img
                  :src="displayProfile"
                >
              </v-avatar>
            </div>
            <v-btn
              text
              class="primary px-6 ml-6"
              depressed
              small
              :disabled="toggleUploadProfile"
              @click="toggleUploadProfile = true"
            >
              <v-icon
                left
                small
              >
                mdi-upload
              </v-icon>
              Upload
            </v-btn>
            <v-btn
              text
              class="px-6 ml-2"
              depressed
              small
              outlined
              :disabled="toggleUploadProfile"
              :loading="removeProfilePhotoLoading"
              @click="dialogConfirmRemovePhoto = true"
            >
              Remove
            </v-btn>
          </div>
        </v-row>
        <v-expand-transition>
          <v-row
            v-if="toggleUploadProfile"
            class="mt-6"
          >
            <v-col
              cols="4"
            >
              <v-file-input
                v-model="imageFile"
                outlined
                label="Select a profile picture"
                accept="image/*"
                type="file"
                prepend-icon=""
                prepend-inner-icon="mdi-image"
                @change="onImageSelect"
              />
            </v-col>
            <v-col
              cols="2"
              class="mt-n1"
            >
              <v-btn
                block
                class="primary"
                small
                :loading="saveProfilePhotoLoading"
                @click="saveProfilePhoto"
              >
                Save
              </v-btn>
              <v-btn
                text
                outlined
                small
                block
                class="mt-2"
                @click="toggleUploadProfile = false"
              >
                Cancel
              </v-btn>
            </v-col>
          </v-row>
        </v-expand-transition>
        <v-row class="mt-6">
          <v-col cols="4">
            <v-text-field
              v-model="firstName"
              outlined
              label="First Name"
            />
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model="middleName"
              outlined
              label="Middle Name"
            />
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model="lastName"
              outlined
              label="Last Name"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-menu
              ref="menuBirthdate"
              v-model="menuBirthdate"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template #activator="{ on, attrs }">
                <v-text-field
                  v-model="birthdate"
                  label="Birthdate"
                  outlined
                  v-bind="attrs"
                  v-on="on"
                />
              </template>
              <v-date-picker
                ref="picker"
                v-model="birthdate"
                :max="new Date().toISOString().substr(0, 10)"
                min="1950-01-01"
                @change="saveBirthdate"
              />
            </v-menu>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model="calculateAge"
              outlined
              readonly
              label="Age"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-text-field
              v-model="email"
              outlined
              readonly
              label="Email"
            />
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model="phoneNumber"
              outlined
              label="Phone Number"
              hint="0000-000-0000"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="school"
              outlined
              label="School / University"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="homeAddress"
              outlined
              label="Home Address"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-text-field
              v-model="studentNumber"
              outlined
              label="Student Number"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-text-field
              v-model="course"
              outlined
              label="Course"
            />
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model="section"
              outlined
              label="Section"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-btn
              class="subtitle-1 primary text-none"
              block
              :disabled="!hasChangesNow"
              :loading="loading"
              @click="submitChanges"
            >
              Submit Update
            </v-btn>
          </v-col>
          <v-col cols="4">
            <v-btn
              class="subtitle-1 info text-none"
              block
              :disabled="toggleChangePassword"
              @click="toggleChangePasswordMthd"
            >
              Change Password
            </v-btn>
          </v-col>
          <v-col cols="4">
            <v-btn
              class="subtitle-1 red text-none"
              block
            >
              Delete Account
            </v-btn>
          </v-col>
        </v-row>
        <v-expand-transition>
          <v-row v-if="hasChangesNow">
            <v-col cols="4">
              <v-btn
                class="subtitle-1 text-none"
                block
                outlined
                text
                @click="cancelChanges"
              >
                Cancel
              </v-btn>
            </v-col>
          </v-row>
        </v-expand-transition>
        <v-expand-transition>
          <v-row v-if="toggleChangePassword">
            <v-col cols="8">
              <v-card
                elevation="2"
              >
                <v-card-title>Change Password</v-card-title>
                <v-card-text class="mt-3">
                  <validation-observer
                    ref="observer"
                    v-slot="{ invalid }"
                  >
                    <v-form @submit.prevent="changePassword">
                      <div class="mt-6">
                        <v-tooltip
                          top
                          color="primary"
                        >
                          <template #activator="{on, attrs}">
                            <div
                              v-bind="attrs"
                              v-on="on"
                            >
                              <password
                                v-model="input_password"
                                :strength-meter-only="true"
                                @score="showScore"
                              />
                            </div>
                          </template>
                          <span>Password strength</span>
                        </v-tooltip>
                      </div>
                      <validation-provider
                        v-slot="{ errors }"
                        name="New Password"
                        rules="changePassword_required|changePassword_min:8"
                      >
                        <v-text-field
                          v-model="input_password"
                          label="New Password"
                          prepend-icon="mdi-lock-outline"
                          :error-messages="errors"
                          :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                          :type="showPassword ? 'text' : 'password'"
                          @click:append="showPassword = !showPassword"
                        />
                      </validation-provider>
                      <validation-provider
                        v-slot="{ errors }"
                        name="Confirm New Password"
                        rules="changePassword_required|changePassword_min:8"
                      >
                        <v-text-field
                          v-model="input_confirmPassword"
                          prepend-icon="mdi-lock-outline"
                          label="Confirm New Password"
                          :error-messages="errors"
                          :append-icon="showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
                          :type="showConfirmPassword ? 'text' : 'password'"
                          @click:append="showConfirmPassword = !showConfirmPassword"
                        />
                      </validation-provider>
                      <span class="subtitle-1">Authentication Required</span>
                      <validation-provider
                        v-slot="{ errors }"
                        name="Current Password"
                        rules="changePassword_required|changePassword_min:8"
                      >
                        <v-text-field
                          v-model="input_oldPassword"
                          prepend-icon="mdi-lock-outline"
                          label="Current Password"
                          :error-messages="errors"
                          :append-icon="showOldPassword ? 'mdi-eye-off' : 'mdi-eye'"
                          :type="showOldPassword ? 'text' : 'password'"
                          @click:append="showOldPassword = !showOldPassword"
                        />
                      </validation-provider>
                      <v-row>
                        <v-col>
                          <v-btn
                            block
                            class="primary"
                            type="submit"
                            :disabled="invalid || passwordStrength <= 1"
                            :loading="changePasswordLoading"
                          >
                            Change Password
                          </v-btn>
                        </v-col>
                        <v-col>
                          <v-btn
                            block
                            text
                            outlined
                            @click="toggleChangePassword = false"
                          >
                            Cancel
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-form>
                  </validation-observer>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-expand-transition>
      </v-card>
    </v-card-text>
    <classic-dialog
      :v-model="classicDialog"
      :title="classicDialogTitle"
      :text="classicDialogText"
      @close="classicDialog = false"
    />
    <confirm-dialog
      :model="dialogConfirmRemovePhoto"
      title="Remove Profile Photo"
      text="Are you sure you want to remove your photo?"
      @goto-response="removeProfile"
    />
  </v-card>
</template>
<script lang="ts">
  import Vue from 'vue'
  import { User } from '@/model/User'
  import { firebaseAuth, storageRef, usersCollection } from '@/fb'

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  import Password from 'vue-password-strength-meter'
  import { extend, ValidationObserver, ValidationProvider } from 'vee-validate'
  import { min, required } from 'vee-validate/dist/rules'
  import ClassicDialog from '@/views/dashboard/components/dialogs/ClassicDialog.vue'
  import firebase from 'firebase/app'

  extend('changePassword_required', {
    ...required,
    message: '{_field_} is required.',
  })

  extend('changePassword_min', {
    ...min,
    message: '{_field_} too short.',
  })

  export default Vue.extend({
    name: 'SettingsAccount',
    components: {
      ValidationObserver,
      ValidationProvider,
      Password,
      ClassicDialog,
    },
    data () {
      return {
        toggleUploadProfile: false,
        imageFile: {} as File,
        imageSource: '',
        menuBirthdate: false,

        // primary student infos
        input_firstName: '',
        input_middleName: '',
        input_lastName: '',
        input_birthdate: '',
        input_email: '',

        // extras
        input_phoneNumber: '',
        input_school: '',
        input_homeAddress: '',
        input_studentNumber: '',
        input_course: '',
        input_section: '',

        hasChanges: false,
        loading: false,

        // change password
        toggleChangePassword: false,
        input_password: '',
        input_confirmPassword: '',
        input_oldPassword: '',

        showPassword: false,
        showConfirmPassword: false,
        showOldPassword: false,
        passwordStrength: 0,
        changePasswordLoading: false,

        classicDialog: false,
        classicDialogTitle: '',
        classicDialogText: '',

        saveProfilePhotoLoading: false,
        removeProfilePhotoLoading: false,
        dialogConfirmRemovePhoto: false,
      }
    },
    computed: {
      user (): User {
        return this.$store.getters['user/getCurrentUser']
      },
      displayProfile (): string {
        if (this.toggleUploadProfile) {
          return this.imageSource
        } else {
          return this.user.profile
        }
      },
      calculateAge (): number {
        const birthday = new Date(this.user.birthdate)
        const age = Date.now() - birthday.getTime()
        const ageDate = new Date(age)
        return Math.abs(ageDate.getUTCFullYear() - 1970)
      },

      // DISPLAY
      firstName: {
        get (): string {
          if (this.input_firstName !== this.user.firstName) {
            return this.input_firstName
          } else {
            return this.user.firstName
          }
        },
        set (newValue: string):void {
          this.input_firstName = newValue.trim()
        },
      },
      middleName: {
        get (): string {
          if (this.input_middleName !== this.user.middleName) {
            return this.input_middleName
          } else {
            return this.user.middleName
          }
        },
        set (newValue: string):void {
          this.input_middleName = newValue.trim()
        },
      },
      lastName: {
        get (): string {
          if (this.input_lastName !== this.user.lastName) {
            return this.input_lastName
          } else {
            return this.user.lastName
          }
        },
        set (newValue: string):void {
          this.input_lastName = newValue.trim()
        },
      },
      birthdate: {
        get (): string {
          if (this.input_birthdate !== this.user.birthdate) {
            return this.input_birthdate
          } else {
            return this.user.birthdate
          }
        },
        set (newValue: string):void {
          this.input_birthdate = newValue
        },
      },
      email: {
        get (): string {
          if (this.input_email !== this.user.email) {
            return this.input_email
          } else {
            return this.user.email
          }
        },
        set (newValue: string):void {
          this.input_email = newValue.trim()
        },
      },
      phoneNumber: {
        get (): string {
          if (this.input_phoneNumber !== this.user.phoneNumber) {
            return this.input_phoneNumber
          } else {
            return this.user.phoneNumber
          }
        },
        set (newValue: string):void {
          this.input_phoneNumber = newValue.trim()
        },
      },
      school: {
        get (): string {
          if (this.input_school !== this.user.school) {
            return this.input_school
          } else {
            return this.user.school
          }
        },
        set (newValue: string):void {
          this.input_school = newValue.trim()
        },
      },
      homeAddress: {
        get (): string {
          if (this.input_homeAddress !== this.user.homeAddress) {
            return this.input_homeAddress
          } else {
            return this.user.homeAddress
          }
        },
        set (newValue: string):void {
          this.input_homeAddress = newValue.trim()
        },
      },
      studentNumber: {
        get (): string {
          if (this.input_studentNumber !== this.user.studentNumber) {
            return this.input_studentNumber
          } else {
            return this.user.studentNumber
          }
        },
        set (newValue: string):void {
          this.input_studentNumber = newValue.trim()
        },
      },
      course: {
        get (): string {
          if (this.input_course !== this.user.course) {
            return this.input_course
          } else {
            return this.user.course
          }
        },
        set (newValue: string):void {
          this.input_course = newValue.trim()
        },
      },
      section: {
        get (): string {
          if (this.input_section !== this.user.section) {
            return this.input_section
          } else {
            return this.user.section
          }
        },
        set (newValue: string):void {
          this.input_section = newValue.trim()
        },
      },
      hasChangesNow: {
        get (): boolean {
          let changes = false
          if (this.user.firstName !== this.firstName) {
            changes = true
          }
          if (this.user.middleName !== this.middleName) {
            changes = true
          }
          if (this.user.lastName !== this.lastName) {
            changes = true
          }
          if (this.user.birthdate !== this.birthdate) {
            changes = true
          }
          if (this.user.email !== this.email) {
            changes = true
          }
          if (this.user.phoneNumber !== this.phoneNumber) {
            changes = true
          }
          if (this.user.school !== this.school) {
            changes = true
          }
          if (this.user.homeAddress !== this.homeAddress) {
            changes = true
          }
          if (this.user.studentNumber !== this.studentNumber) {
            changes = true
          }
          if (this.user.course !== this.course) {
            changes = true
          }
          if (this.user.section !== this.section) {
            changes = true
          }

          return changes || this.hasChanges
        },
        set (newValue: boolean): void {
          this.hasChanges = newValue
        },
      },
    },
    watch: {
      menuBirthdate (val) {
        val && setTimeout(() => ((this.$refs.picker as any).activePicker = 'YEAR'))
      },
    },
    mounted () {
      // primary student infos
      this.input_firstName = this.user.firstName
      this.input_middleName = this.user.middleName
      this.input_lastName = this.user.lastName
      this.input_birthdate = this.user.birthdate
      this.input_email = this.user.email
      this.input_phoneNumber = this.user.phoneNumber
      this.input_school = this.user.school
      this.input_homeAddress = this.user.homeAddress
      this.input_studentNumber = this.user.studentNumber
      this.input_course = this.user.course
      this.input_section = this.user.section
    },
    methods: {
      saveBirthdate (date): void {
        (this.$refs.menuBirthdate as any).save(date)
      },
      onImageSelect () {
        if (this.imageFile) {
          this.imageSource = URL.createObjectURL(this.imageFile)
        } else {
          this.imageSource = ''
        }
      },
      async saveProfilePhoto () {
        this.saveProfilePhotoLoading = true
        if (!this.imageSource) {
          this.classicDialogTitle = 'Save Failed'
          this.classicDialogText = 'Please select an image.'
          this.classicDialog = true
          return
        }

        const profileStorageRef = storageRef.child('users').child(this.user.id).child('profile')
        await profileStorageRef.put(this.imageFile).then(() => {
          profileStorageRef.getDownloadURL().then(url => {
            usersCollection.doc(this.user.id).set({
              imgProfile: url,
            }, { merge: true })
          })
        }).finally(() => {
          this.saveProfilePhotoLoading = false
          this.toggleUploadProfile = false
        }).catch(error => {
          console.log(error.message)
        })
      },
      async removeProfile (response: boolean) {
        if (response) {
          this.removeProfilePhotoLoading = true
          // remove on storage
          await storageRef.child('users').child(this.user.id).child('profile')
            .delete().then(() => {
              // set default on firestore
              usersCollection.doc(this.user.id).set({
                imgProfile: 'https://firebasestorage.googleapis.com/v0/b/lorem-classroom.appspot.com/o/users%2Fdefault_profile.jpg?alt=media&token=47adcd7a-be7b-4067-9d57-a0b173a91bd5',
              }, { merge: true })
            }).catch(error => {
              this.classicDialogTitle = 'Remove Failed'
              this.classicDialogText = error.message
              this.classicDialog = true
            }).finally(() => {
              this.removeProfilePhotoLoading = false
              this.dialogConfirmRemovePhoto = false
            })
        } else {
          this.dialogConfirmRemovePhoto = false
        }
      },
      async submitChanges () {
        this.loading = true

        const updatedUserInfo = {
          firstName: this.firstName || '',
          middleName: this.middleName || '',
          lastName: this.lastName || '',
          birthdate: this.birthdate || '',
          email: this.email || '',
          phoneNumber: this.phoneNumber || '',
          school: this.school || '',
          homeAddress: this.homeAddress || '',
          studentNumber: this.studentNumber || '',
          course: this.course || '',
          section: this.section || '',
        }

        await usersCollection.doc(this.user.id).set(updatedUserInfo, { merge: true }).then(() => {
          this.$notify({
            group: 'appWideNotification',
            title: 'Update Success',
            text: 'Account has been updated successfully.',
            type: 'success',
          })
        }).catch(error => {
          this.$notify({
            group: 'appWideNotification',
            title: 'Update Failed',
            text: error.message,
            type: 'error',
          })
        }).finally(() => {
          this.hasChangesNow = false
          this.loading = false
        })
      },
      cancelChanges () {
        this.firstName = this.user.firstName
        this.middleName = this.user.middleName
        this.lastName = this.user.lastName
        this.birthdate = this.user.birthdate
        this.email = this.user.email
        this.phoneNumber = this.user.phoneNumber
        this.school = this.user.school
        this.homeAddress = this.user.homeAddress
        this.studentNumber = this.user.studentNumber
        this.course = this.user.course
        this.section = this.user.section

        this.hasChangesNow = false
      },
      toggleChangePasswordMthd (): void {
        this.input_password = ''
        this.input_confirmPassword = ''
        this.input_oldPassword = ''
        this.passwordStrength = 0
        this.toggleChangePassword = true
      },
      async changePassword () {
        this.changePasswordLoading = true

        if (this.input_password !== this.input_confirmPassword) {
          this.classicDialogTitle = 'Change Password Failed'
          this.classicDialogText = 'Passwords do not match.'
          this.classicDialog = true
          return
        }
        const currentUser = firebaseAuth.currentUser
        const credential = firebase.auth.EmailAuthProvider.credential(
          this.user.email,
          this.input_oldPassword,
        )
        if (currentUser && credential) {
          await currentUser.reauthenticateWithCredential(credential)
            .then(() => {
              currentUser.updatePassword(this.input_password).then(() => {
                this.toggleChangePassword = false

                this.classicDialogTitle = 'Change Password Success'
                this.classicDialogText = 'Your password has been updated.'
                this.classicDialog = true
              }).catch(updateError => {
                this.classicDialogTitle = 'Change Password Failed'
                this.classicDialogText = updateError.message
                this.classicDialog = true
              })
            }).catch(reAuthError => {
              if (reAuthError.code === 'auth/wrong-password') {
                this.classicDialogTitle = 'Change Password Failed'
                this.classicDialogText = 'Invalid credential'
                this.classicDialog = true
                return
              }

              this.classicDialogTitle = 'Change Password Failed'
              this.classicDialogText = reAuthError.message
              this.classicDialog = true
            }).finally(() => {
              this.changePasswordLoading = false
            })
        }
      },
      showScore (score) {
        this.passwordStrength = score
      },
    },
  })
</script>

<style scoped>

</style>
