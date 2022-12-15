import { Story, Meta } from '@storybook/react/types-6-0'

import Main from '.'

export default {
  title: 'Main',

  component: Main,
  args: {
    title: 'piupiu',
    description: 'hesoyam'
  }
} as Meta

export const Default: Story = (args) => <Main {...args} />

export const Basic: Story = (args) => <Main {...args} />
Basic.args = {
  title: 'tiktok',
  description: 'arrozdoce'
}

export const Advanced: Story = (args) => <Main {...args} />
Advanced.args = {
  title: 'Hmm',
  description: 'suisui'
}
