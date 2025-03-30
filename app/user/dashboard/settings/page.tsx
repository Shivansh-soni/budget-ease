import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BellRing,
  CreditCard,
  Download,
  Key,
  Moon,
  Save,
  Sun,
  Upload,
  User,
} from "lucide-react";
import { Select, SelectItem } from "@heroui/select";

export default function SettingsPage() {
  return (
    <div className='space-y-6'>
      <div>
        <h2 className='text-3xl font-bold tracking-tight text-primary'>
          Settings
        </h2>
        <p className='text-dark-moss-green'>
          Manage your account settings and preferences.
        </p>
      </div>

      <Tabs defaultValue='profile' className='space-y-4'>
        <TabsList className='grid w-full grid-cols-4 md:w-auto'>
          <TabsTrigger value='profile' className='flex items-center gap-2'>
            <User className='h-4 w-4' />
            <span className='hidden sm:inline'>Profile</span>
          </TabsTrigger>
          <TabsTrigger value='account' className='flex items-center gap-2'>
            <CreditCard className='h-4 w-4' />
            <span className='hidden sm:inline'>Account</span>
          </TabsTrigger>
          <TabsTrigger
            value='notifications'
            className='flex items-center gap-2'
          >
            <BellRing className='h-4 w-4' />
            <span className='hidden sm:inline'>Notifications</span>
          </TabsTrigger>
          <TabsTrigger value='appearance' className='flex items-center gap-2'>
            <Sun className='h-4 w-4' />
            <span className='hidden sm:inline'>Appearance</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value='profile' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your personal information
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='flex flex-col sm:flex-row gap-6 items-start sm:items-center'>
                <Avatar className='h-24 w-24 border-2 border-muted'>
                  <AvatarImage src='/placeholder-user.jpg' alt='User' />
                  <AvatarFallback className='text-2xl'>JD</AvatarFallback>
                </Avatar>
                <div className='space-y-2'>
                  <h3 className='font-medium text-primary'>Profile Picture</h3>
                  <div className='flex gap-2'>
                    <Button
                      variant='outline'
                      size='sm'
                      className='flex items-center gap-2'
                    >
                      <Upload className='h-4 w-4' />
                      Upload
                    </Button>
                    <Button
                      variant='outline'
                      size='sm'
                      className='flex items-center gap-2 text-red-500 hover:text-red-600'
                    >
                      Remove
                    </Button>
                  </div>
                  <p className='text-xs text-dark-moss-green'>
                    JPG, GIF or PNG. Max size of 2MB.
                  </p>
                </div>
              </div>

              <Separator />

              <div className='grid gap-4 sm:grid-cols-2'>
                <div className='space-y-2'>
                  <Label htmlFor='first-name'>First Name</Label>
                  <Input id='first-name' defaultValue='John' />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='last-name'>Last Name</Label>
                  <Input id='last-name' defaultValue='Doe' />
                </div>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='email'>Email Address</Label>
                <Input
                  id='email'
                  type='email'
                  defaultValue='john.doe@example.com'
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='phone'>Phone Number</Label>
                <Input id='phone' type='tel' defaultValue='+1 (555) 123-4567' />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='bio'>Bio</Label>
                <Input
                  id='bio'
                  defaultValue='Finance enthusiast and budget planner'
                />
                <p className='text-xs text-dark-moss-green'>
                  Brief description for your profile.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className='bg-accent hover:bg-accent-secondary'>
                <Save className='mr-2 h-4 w-4' />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value='account' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account preferences</CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='space-y-2'>
                {/* <Label htmlFor='currency'>Currency</Label> */}
                <Select className='max-w-xs'>
                  <SelectItem key='usd'>USD </SelectItem>
                  <SelectItem key='eur'>EUR </SelectItem>
                  <SelectItem key='gbp'>GBP </SelectItem>
                  <SelectItem key='cad'>CAD </SelectItem>
                  <SelectItem key='aud'>AUD</SelectItem>
                </Select>
                {/* <Select >
                  <SelectItem key='usd'>USD ($)</SelectItem>
                  <SelectItem key='eur'>EUR (€)</SelectItem>
                  <SelectItem key='gbp'>GBP (£)</SelectItem>
                  <SelectItem key='cad'>CAD ($)</SelectItem>
                  <SelectItem key='aud'>AUD ($)</SelectItem>
                </Select> */}
              </div>

              {/* <div className='space-y-2'>
                <Label htmlFor='language'>Language</Label>
                <Select defaultValue='en'>
                  <SelectTrigger id='language'>
                    <SelectValue placeholder='Select language' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='en'>English</SelectItem>
                    <SelectItem value='es'>Spanish</SelectItem>
                    <SelectItem value='fr'>French</SelectItem>
                    <SelectItem value='de'>German</SelectItem>
                    <SelectItem value='zh'>Chinese</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='date-format'>Date Format</Label>
                <Select defaultValue='mdy'>
                  <SelectTrigger id='date-format'>
                    <SelectValue placeholder='Select date format' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='mdy'>MM/DD/YYYY</SelectItem>
                    <SelectItem value='dmy'>DD/MM/YYYY</SelectItem>
                    <SelectItem value='ymd'>YYYY/MM/DD</SelectItem>
                  </SelectContent>
                </Select>
              </div> */}

              <Separator />

              <div className='space-y-4'>
                <h3 className='font-medium text-primary'>Data Management</h3>
                <div className='flex flex-col sm:flex-row gap-2'>
                  <Button variant='outline' className='flex items-center gap-2'>
                    <Download className='h-4 w-4' />
                    Export Data
                  </Button>
                  <Button variant='outline' className='flex items-center gap-2'>
                    <Upload className='h-4 w-4' />
                    Import Data
                  </Button>
                </div>
              </div>

              <Separator />

              <div className='space-y-4'>
                <h3 className='font-medium text-primary text-red-500'>
                  Danger Zone
                </h3>
                <Button variant='destructive'>Delete Account</Button>
                <p className='text-xs text-dark-moss-green'>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>Manage your account security</CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='space-y-2'>
                <Label htmlFor='current-password'>Current Password</Label>
                <Input id='current-password' type='password' />
              </div>

              <div className='grid gap-4 sm:grid-cols-2'>
                <div className='space-y-2'>
                  <Label htmlFor='new-password'>New Password</Label>
                  <Input id='new-password' type='password' />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='confirm-password'>Confirm New Password</Label>
                  <Input id='confirm-password' type='password' />
                </div>
              </div>

              <div className='flex items-center space-x-2'>
                <Switch id='two-factor' />
                <Label htmlFor='two-factor' className='flex items-center gap-2'>
                  <Key className='h-4 w-4' />
                  Enable Two-Factor Authentication
                </Label>
              </div>

              <Button className='bg-accent hover:bg-accent-secondary'>
                Update Password
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='notifications' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Manage how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='space-y-4'>
                <h3 className='font-medium text-primary'>
                  Email Notifications
                </h3>
                <div className='space-y-2'>
                  <div className='flex items-center justify-between'>
                    <div className='space-y-0.5'>
                      <Label htmlFor='budget-alerts'>Budget Alerts</Label>
                      <p className='text-xs text-dark-moss-green'>
                        Receive alerts when you're approaching budget limits
                      </p>
                    </div>
                    <Switch id='budget-alerts' defaultChecked />
                  </div>
                </div>
                <div className='space-y-2'>
                  <div className='flex items-center justify-between'>
                    <div className='space-y-0.5'>
                      <Label htmlFor='goal-updates'>Goal Updates</Label>
                      <p className='text-xs text-dark-moss-green'>
                        Get notified about progress on your financial goals
                      </p>
                    </div>
                    <Switch id='goal-updates' defaultChecked />
                  </div>
                </div>
                <div className='space-y-2'>
                  <div className='flex items-center justify-between'>
                    <div className='space-y-0.5'>
                      <Label htmlFor='monthly-summary'>Monthly Summary</Label>
                      <p className='text-xs text-dark-moss-green'>
                        Receive a monthly summary of your financial activity
                      </p>
                    </div>
                    <Switch id='monthly-summary' defaultChecked />
                  </div>
                </div>
                <div className='space-y-2'>
                  <div className='flex items-center justify-between'>
                    <div className='space-y-0.5'>
                      <Label htmlFor='tips-news'>Tips & News</Label>
                      <p className='text-xs text-dark-moss-green'>
                        Financial tips and news related to personal finance
                      </p>
                    </div>
                    <Switch id='tips-news' />
                  </div>
                </div>
              </div>

              <Separator />

              <div className='space-y-4'>
                <h3 className='font-medium text-primary'>Push Notifications</h3>
                <div className='space-y-2'>
                  <div className='flex items-center justify-between'>
                    <div className='space-y-0.5'>
                      <Label htmlFor='push-budget-alerts'>Budget Alerts</Label>
                      <p className='text-xs text-dark-moss-green'>
                        Receive push notifications for budget alerts
                      </p>
                    </div>
                    <Switch id='push-budget-alerts' defaultChecked />
                  </div>
                </div>
                <div className='space-y-2'>
                  <div className='flex items-center justify-between'>
                    <div className='space-y-0.5'>
                      <Label htmlFor='push-goal-updates'>Goal Updates</Label>
                      <p className='text-xs text-dark-moss-green'>
                        Receive push notifications for goal updates
                      </p>
                    </div>
                    <Switch id='push-goal-updates' />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className='bg-accent hover:bg-accent-secondary'>
                Save Preferences
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value='appearance' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize how BudgetEase looks</CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='space-y-4'>
                <h3 className='font-medium text-primary'>Theme</h3>
                <div className='grid grid-cols-3 gap-4'>
                  <div className='flex flex-col items-center gap-2'>
                    <div className='border-2 border-primary rounded-md p-2 cursor-pointer bg-cornsilk'>
                      <Sun className='h-8 w-8 text-primary' />
                    </div>
                    <span className='text-sm'>Light</span>
                  </div>
                  <div className='flex flex-col items-center gap-2'>
                    <div className='border-2 border-muted rounded-md p-2 cursor-pointer bg-primary'>
                      <Moon className='h-8 w-8 text-cornsilk' />
                    </div>
                    <span className='text-sm'>Dark</span>
                  </div>
                  <div className='flex flex-col items-center gap-2'>
                    <div className='border-2 border-muted rounded-md p-2 cursor-pointer bg-gradient-to-b from-cornsilk to-primary'>
                      <div className='flex'>
                        <Sun className='h-4 w-4 text-primary' />
                        <Moon className='h-4 w-4 text-cornsilk' />
                      </div>
                    </div>
                    <span className='text-sm'>System</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className='space-y-4'>
                <h3 className='font-medium text-primary'>Dashboard Layout</h3>
                <div className='space-y-2'>
                  <div className='flex items-center justify-between'>
                    <div className='space-y-0.5'>
                      <Label htmlFor='compact-view'>Compact View</Label>
                      <p className='text-xs text-dark-moss-green'>
                        Display more information in a compact layout
                      </p>
                    </div>
                    <Switch id='compact-view' />
                  </div>
                </div>
                {/* <div className='space-y-2'>
                  <Label htmlFor='default-view'>Default View</Label>
                  <Select defaultValue='overview'>
                    <SelectTrigger id='default-view'>
                      <SelectValue placeholder='Select default view' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='overview'>Overview</SelectItem>
                      <SelectItem value='budget'>Budget</SelectItem>
                      <SelectItem value='goals'>Goals</SelectItem>
                      <SelectItem value='transactions'>Transactions</SelectItem>
                    </SelectContent>
                  </Select>
                </div> */}
              </div>

              <Separator />

              <div className='space-y-4'>
                <h3 className='font-medium text-primary'>Accessibility</h3>
                <div className='space-y-2'>
                  <div className='flex items-center justify-between'>
                    <div className='space-y-0.5'>
                      <Label htmlFor='high-contrast'>High Contrast</Label>
                      <p className='text-xs text-dark-moss-green'>
                        Increase contrast for better visibility
                      </p>
                    </div>
                    <Switch id='high-contrast' />
                  </div>
                </div>
                <div className='space-y-2'>
                  <div className='flex items-center justify-between'>
                    <div className='space-y-0.5'>
                      <Label htmlFor='large-text'>Larger Text</Label>
                      <p className='text-xs text-dark-moss-green'>
                        Increase text size throughout the application
                      </p>
                    </div>
                    <Switch id='large-text' />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className='bg-accent hover:bg-accent-secondary'>
                Save Appearance Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
