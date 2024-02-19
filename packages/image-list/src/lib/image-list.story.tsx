import React from 'react';
import {
  ImageList,
  ImageListImage,
  ImageListImageAspectContainer,
  ImageListItem,
  ImageListLabel,
  ImageListSupporting
} from './image-list'; // replace with your actual component import
import { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Lists/ImageList',
  component: ImageList
} as Meta;

type Story = StoryObj<typeof ImageList>;

const images = [
  'https://placekitten.com/300/200',
  'https://placekitten.com/200/301',
  'https://placekitten.com/300/202',
  'https://placekitten.com/300/203',
  'https://placekitten.com/300/204',
  'https://placekitten.com/200/305',
  'https://placekitten.com/300/206',
  'https://placekitten.com/300/207',
  'https://placekitten.com/200/308',
  'https://placekitten.com/300/209',
  'https://placekitten.com/301/200',
  'https://placekitten.com/202/300',
  'https://placekitten.com/303/200',
  'https://placekitten.com/304/200',
  'https://placekitten.com/205/300'
];

export const DefaultImageListStory: Story = {
  render: (args) => {
    const { withTextProtection } = args;
    return (
      <ImageList withTextProtection={withTextProtection}>
        {images.map((src) => (
          <ImageListItem
            key={src}
            style={{ margin: '2px', width: 'calc(100% / 5 - 4.2px)' }}
          >
            <ImageListImageAspectContainer
              style={{ paddingBottom: 'calc(100% / 1.5)' }}
            >
              <ImageListImage src={src} />
            </ImageListImageAspectContainer>
            <ImageListSupporting>
              <ImageListLabel>Text label</ImageListLabel>
            </ImageListSupporting>
          </ImageListItem>
        ))}
      </ImageList>
    );
  }
};

export const MasonryImageListStory: Story = {
  render: (args) => {
    const { withTextProtection } = args;
    return (
      <ImageList
        masonry
        withTextProtection={withTextProtection}
        style={{
          columnCount: 5,
          columnGap: '16px',
          maxWidth: '1000px'
        }}
      >
        {images.map((src) => (
          <ImageListItem key={src} style={{ marginBottom: '16px' }}>
            <ImageListImage src={src} />
            <ImageListSupporting>
              <ImageListLabel>Text label</ImageListLabel>
            </ImageListSupporting>
          </ImageListItem>
        ))}
      </ImageList>
    );
  }
};
