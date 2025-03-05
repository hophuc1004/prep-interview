/* eslint-disable react-hooks/rules-of-hooks */
import HighLightText from 'components/HighLightText'
import TableVirtualizer from 'components/Table/TableVirtualizer'
import { ColumnDef } from 'components/Table/types'
import TextField from 'components/TextField'
import Typography from 'components/Typography'
import debounce from 'lodash/debounce'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
// import useEmployeeList from '~/modules/employee/hooks/employee/useEmployeeList'
import { CloseIcon, PlusIcon, SearchIcon } from '~/shared/icons'
import { getFullName } from '~/shared/utils/util'
import { AvatarInfo, DatePickerV2 } from '~/modules/share/components'
import { Button } from 'components/Button'
import { fDate } from '~/shared/utils/format-time'
import { Tooltip as ReactTooltip } from 'react-tooltip'
import { useNavigate } from 'react-router-dom'
import { LIST_ONBOARDING_RE_FETCH } from '~/modules/share/event'
import useCurrentUser from '~/hooks/useCurrentUser'
import { useModal } from '~/contexts/ModalContext'
import { useAlert } from '~/contexts/AlertContext'
import NoProject from '../components/NoProject'
import SelectedDateCpn from '~/modules/share/leave/SelectedDateCpn'

export const dataProject = [
  {
    id: '550e8400-e29b-41d4-a716-446655440000',
    name: 'Image Classification Pipeline',
    metadata: {},
    created_at: '2024-01-10T12:00:00Z',
    updated_at: '2024-02-20T15:30:00Z',
    datasets: [
      {
        id: '3b241101-e2bb-4255-8caf-4136c566a961',
        name: 'ImageNet Preprocessed',
        description: 'Processed ImageNet dataset for classification tasks',
        project_id: '550e8400-e29b-41d4-a716-446655440000',
        is_locked: false,
        metadata: {},
        created_at: '2024-01-15T08:00:00Z',
        updated_at: '2024-02-18T14:45:00Z',
        data: [
          {
            id: 'c9b1d2f0-4c2b-11ee-be56-0242ac120002',
            value: {
              image_path: 's3://bucket/image1.jpg',
              label: 'cat'
            },
            metadata: {
              source: 'ImageNet',
              resolution: '224x224'
            },
            status: 'Pending',
            dataset_id: '3b241101-e2bb-4255-8caf-4136c566a961',
            created_at: '2024-02-10T10:00:00Z',
            updated_at: '2024-02-12T11:00:00Z'
          },
          {
            id: 'c4dbeccd-b549-43f6-b101-811f25a93bf2',
            value: {
              image_path: 's3://bucket/image_ce27349d-238d-4724-8c15-85a1c321774d.jpg',
              label: 'cat'
            },
            metadata: {
              source: 'ImageNet',
              resolution: '224x224'
            },
            status: 'Pending',
            dataset_id: '3b241101-e2bb-4255-8caf-4136c566a961',
            created_at: '2024-05-16T20:16:11Z',
            updated_at: '2024-10-01T08:05:27Z'
          },
          {
            id: '09d2f430-ed5b-4c84-988e-1b8880b9068c',
            value: {
              image_path: 's3://bucket/image_5fcabfeb-a058-4ed1-b372-96a5e967b58b.jpg',
              label: 'dog'
            },
            metadata: {
              source: 'ImageNet',
              resolution: '224x224'
            },
            status: 'Pending',
            dataset_id: '3b241101-e2bb-4255-8caf-4136c566a961',
            created_at: '2024-11-19T07:06:10Z',
            updated_at: '2024-11-13T08:06:52Z'
          },
          {
            id: '3dbaf7bb-8b28-4411-8a86-54381f027408',
            value: {
              image_path: 's3://bucket/image_b0d5f784-43e3-45ae-bb2b-de0d28c6416f.jpg',
              label: 'bird'
            },
            metadata: {
              source: 'ImageNet',
              resolution: '224x224'
            },
            status: 'Process',
            dataset_id: '3b241101-e2bb-4255-8caf-4136c566a961',
            created_at: '2024-12-08T21:10:03Z',
            updated_at: '2024-08-13T20:36:46Z'
          },
          {
            id: '5c55d5bd-0dd5-445f-b1fb-f84df4826a6e',
            value: {
              image_path: 's3://bucket/image_7c5d9b5a-a08a-4a62-9ea4-dc509d4975e3.jpg',
              label: 'car'
            },
            metadata: {
              source: 'ImageNet',
              resolution: '224x224'
            },
            status: 'Process',
            dataset_id: '3b241101-e2bb-4255-8caf-4136c566a961',
            created_at: '2024-08-12T06:47:32Z',
            updated_at: '2024-06-01T20:02:16Z'
          },
          {
            id: '45b7ac95-dda1-4f33-9688-d3b5efe21356',
            value: {
              image_path: 's3://bucket/image_14645b03-3204-40f8-bedb-96396a8905e0.jpg',
              label: 'tree'
            },
            metadata: {
              source: 'ImageNet',
              resolution: '224x224'
            },
            status: 'Process',
            dataset_id: '3b241101-e2bb-4255-8caf-4136c566a961',
            created_at: '2024-08-25T14:23:40Z',
            updated_at: '2024-01-09T02:57:58Z'
          },
          {
            id: '9ca8f735-5783-42e5-81d2-509eff82c07f',
            value: {
              image_path: 's3://bucket/image_2b5c2074-edda-47a3-b0f9-ad5a7577cc3c.jpg',
              label: 'house'
            },
            metadata: {
              source: 'ImageNet',
              resolution: '224x224'
            },
            status: 'Submitted',
            dataset_id: '3b241101-e2bb-4255-8caf-4136c566a961',
            created_at: '2024-04-06T09:05:51Z',
            updated_at: '2024-01-08T17:28:05Z'
          },
          {
            id: '85f2752d-df90-4731-b0d6-6932b5a5b13f',
            value: {
              image_path: 's3://bucket/image_ccd5cb1b-eacd-4284-baea-5c8b34619d0f.jpg',
              label: 'flower'
            },
            metadata: {
              source: 'ImageNet',
              resolution: '224x224'
            },
            status: 'Submitted',
            dataset_id: '3b241101-e2bb-4255-8caf-4136c566a961',
            created_at: '2024-11-30T15:20:05Z',
            updated_at: '2024-02-18T23:41:11Z'
          },
          {
            id: 'ab55f43a-fbbc-4886-9cca-4d9254c5ec45',
            value: {
              image_path: 's3://bucket/image_3ab1080f-8711-4a71-9145-b79923521d89.jpg',
              label: 'person'
            },
            metadata: {
              source: 'ImageNet',
              resolution: '224x224'
            },
            status: 'Process',
            dataset_id: '3b241101-e2bb-4255-8caf-4136c566a961',
            created_at: '2024-12-09T02:13:19Z',
            updated_at: '2024-04-08T13:31:55Z'
          },
          {
            id: '2bd13d9b-f066-451c-9f0e-28958a5e8df5',
            value: {
              image_path: 's3://bucket/image_26eaebf2-2b53-409f-b153-1c17c8b476e6.jpg',
              label: 'food'
            },
            metadata: {
              source: 'ImageNet',
              resolution: '224x224'
            },
            status: 'Pending',
            dataset_id: '3b241101-e2bb-4255-8caf-4136c566a961',
            created_at: '2024-09-25T08:11:46Z',
            updated_at: '2024-06-29T00:05:31Z'
          },
          {
            id: 'e251a069-990e-49f1-9391-085f2cb38362',
            value: {
              image_path: 's3://bucket/image_35d0dbb5-1cf3-48a0-adc3-a5a40b18ad48.jpg',
              label: 'laptop'
            },
            metadata: {
              source: 'ImageNet',
              resolution: '224x224'
            },
            status: 'Pending',
            dataset_id: '3b241101-e2bb-4255-8caf-4136c566a961',
            created_at: '2024-06-13T08:59:39Z',
            updated_at: '2024-12-08T05:25:29Z'
          }
        ]
      }
    ]
  },
  {
    id: 'c8a1cfc0-4c2b-11ee-be56-0242ac120002',
    name: 'NLP Text Classification',
    metadata: {},
    created_at: '2024-02-01T10:00:00Z',
    updated_at: '2024-02-25T16:00:00Z',
    datasets: [
      {
        id: '4a5b6c7d-8e9f-4b0c-b2b1-2e5d8f8f7c6a',
        name: 'Sentiment Analysis Corpus',
        description: 'Labeled dataset for sentiment analysis',
        project_id: 'c8a1cfc0-4c2b-11ee-be56-0242ac120002',
        is_locked: false,
        metadata: {},
        created_at: '2024-02-05T12:00:00Z',
        updated_at: '2024-02-20T14:00:00Z',
        data: [
          {
            id: 'd2a4b5c6-7e8f-490a-92b1-1e3d5c7b6a4f',
            value: {
              text: 'This product is amazing!',
              label: 'positive'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '4a5b6c7d-8e9f-4b0c-b2b1-2e5d8f8f7c6a',
            created_at: '2024-02-10T14:20:00Z',
            updated_at: '2024-02-12T15:30:00Z'
          },
          {
            id: '8791e4b7-63b0-41bf-ab20-8e387654caf2',
            value: {
              text: 'This product is amazing!',
              label: 'positive'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '4a5b6c7d-8e9f-4b0c-b2b1-2e5d8f8f7c6a',
            created_at: '2024-02-27T12:01:05Z',
            updated_at: '2024-11-26T00:07:29Z'
          },
          {
            id: '3903d3c6-b9fd-4cab-9192-af6aa12848cd',
            value: {
              text: 'I had a terrible experience.',
              label: 'negative'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '4a5b6c7d-8e9f-4b0c-b2b1-2e5d8f8f7c6a',
            created_at: '2024-05-05T21:27:44Z',
            updated_at: '2024-07-29T03:51:03Z'
          },
          {
            id: 'd3a2af05-287c-4f05-aab9-c77b3cd31a98',
            value: {
              text: 'The movie was just okay.',
              label: 'neutral'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '4a5b6c7d-8e9f-4b0c-b2b1-2e5d8f8f7c6a',
            created_at: '2024-06-21T08:46:23Z',
            updated_at: '2024-07-03T00:11:40Z'
          },
          {
            id: 'dee3e78d-9c1d-44e7-b838-12c8a11871e6',
            value: {
              text: 'Fantastic service, highly recommend!',
              label: 'positive'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Process',
            dataset_id: '4a5b6c7d-8e9f-4b0c-b2b1-2e5d8f8f7c6a',
            created_at: '2024-04-22T13:51:33Z',
            updated_at: '2024-06-05T06:49:54Z'
          },
          {
            id: '7df7b902-34c0-4c1f-9ace-51f38c5a119f',
            value: {
              text: 'Not worth the money.',
              label: 'negative'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Process',
            dataset_id: '4a5b6c7d-8e9f-4b0c-b2b1-2e5d8f8f7c6a',
            created_at: '2024-01-03T16:46:26Z',
            updated_at: '2024-02-18T19:01:40Z'
          },
          {
            id: 'f09dbf9e-5df5-4d2f-a96c-8e85e57dadc6',
            value: {
              text: 'I love this phone, great battery life!',
              label: 'positive'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '4a5b6c7d-8e9f-4b0c-b2b1-2e5d8f8f7c6a',
            created_at: '2024-06-15T01:27:03Z',
            updated_at: '2024-08-11T11:30:51Z'
          },
          {
            id: 'cb19ba55-265e-4b4c-98c6-ca3e36cdc3d1',
            value: {
              text: 'Customer support was unhelpful.',
              label: 'negative'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '4a5b6c7d-8e9f-4b0c-b2b1-2e5d8f8f7c6a',
            created_at: '2024-12-31T13:11:14Z',
            updated_at: '2024-11-11T00:57:06Z'
          },
          {
            id: '56b241f3-e78d-4383-98ab-74ff90ac7778',
            value: {
              text: 'A must-buy for gamers.',
              label: 'positive'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Pending',
            dataset_id: '4a5b6c7d-8e9f-4b0c-b2b1-2e5d8f8f7c6a',
            created_at: '2024-07-31T03:49:36Z',
            updated_at: '2024-08-13T09:45:28Z'
          },
          {
            id: '56b944eb-6528-49f0-8a1e-26c1044fecef',
            value: {
              text: 'The quality could be better.',
              label: 'neutral'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '4a5b6c7d-8e9f-4b0c-b2b1-2e5d8f8f7c6a',
            created_at: '2024-01-26T08:47:21Z',
            updated_at: '2024-02-26T13:59:24Z'
          },
          {
            id: '470d0b6c-b3bf-4ead-84cc-115d69282461',
            value: {
              text: 'Exceeded my expectations!',
              label: 'positive'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Pending',
            dataset_id: '4a5b6c7d-8e9f-4b0c-b2b1-2e5d8f8f7c6a',
            created_at: '2024-10-25T05:03:19Z',
            updated_at: '2024-07-29T09:00:30Z'
          }
        ]
      },
      {
        id: '5e6f7a8b-9c0d-4d2e-b3a2-3f5e6f7d8a9b',
        name: 'News Classification Dataset',
        description: 'News articles categorized by topic',
        project_id: 'c8a1cfc0-4c2b-11ee-be56-0242ac120002',
        is_locked: false,
        metadata: {},
        created_at: '2024-02-08T11:00:00Z',
        updated_at: '2024-02-22T17:00:00Z',
        data: [
          {
            id: '6f2e3304-6950-474c-b7c4-e190f4ad1a2b',
            value: {
              text: 'This product is amazing!',
              label: 'positive'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '5e6f7a8b-9c0d-4d2e-b3a2-3f5e6f7d8a9b',
            created_at: '2024-04-24T06:54:53Z',
            updated_at: '2024-06-25T17:59:04Z'
          },
          {
            id: '0bc90e91-5c7e-48bf-adb5-e6f530e0b421',
            value: {
              text: 'I had a terrible experience.',
              label: 'negative'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '5e6f7a8b-9c0d-4d2e-b3a2-3f5e6f7d8a9b',
            created_at: '2024-04-18T05:30:12Z',
            updated_at: '2024-10-15T08:07:55Z'
          },
          {
            id: '21c84c90-8693-424e-89d0-23f96f264bae',
            value: {
              text: 'The movie was just okay.',
              label: 'neutral'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '5e6f7a8b-9c0d-4d2e-b3a2-3f5e6f7d8a9b',
            created_at: '2024-09-01T02:15:55Z',
            updated_at: '2024-02-01T02:22:49Z'
          },
          {
            id: '2530e6f6-52b5-4217-80c6-91d0e68565f4',
            value: {
              text: 'Fantastic service, highly recommend!',
              label: 'positive'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '5e6f7a8b-9c0d-4d2e-b3a2-3f5e6f7d8a9b',
            created_at: '2024-07-30T00:42:14Z',
            updated_at: '2024-05-20T17:32:40Z'
          },
          {
            id: '061624db-5e4f-4974-8051-8af2669484ff',
            value: {
              text: 'Not worth the money.',
              label: 'negative'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '5e6f7a8b-9c0d-4d2e-b3a2-3f5e6f7d8a9b',
            created_at: '2024-07-16T15:33:03Z',
            updated_at: '2024-09-04T10:39:15Z'
          },
          {
            id: '27d913b8-6453-4916-a19f-11bd10222add',
            value: {
              text: 'I love this phone, great battery life!',
              label: 'positive'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '5e6f7a8b-9c0d-4d2e-b3a2-3f5e6f7d8a9b',
            created_at: '2024-10-31T12:20:05Z',
            updated_at: '2024-10-14T05:01:10Z'
          },
          {
            id: 'b1a153a5-769a-4520-8cce-d3a516a52f12',
            value: {
              text: 'Customer support was unhelpful.',
              label: 'negative'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '5e6f7a8b-9c0d-4d2e-b3a2-3f5e6f7d8a9b',
            created_at: '2024-06-14T20:48:41Z',
            updated_at: '2024-06-24T22:18:12Z'
          },
          {
            id: 'e6c92438-3eab-4ae3-bb8b-fac4616add43',
            value: {
              text: 'A must-buy for gamers.',
              label: 'positive'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '5e6f7a8b-9c0d-4d2e-b3a2-3f5e6f7d8a9b',
            created_at: '2024-10-06T18:20:13Z',
            updated_at: '2024-09-26T05:20:11Z'
          },
          {
            id: '29df90bf-4fbe-480b-8aba-a59c9928846f',
            value: {
              text: 'The quality could be better.',
              label: 'neutral'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '5e6f7a8b-9c0d-4d2e-b3a2-3f5e6f7d8a9b',
            created_at: '2024-10-16T12:19:38Z',
            updated_at: '2024-09-20T00:27:36Z'
          },
          {
            id: '589230f1-7bdc-431b-a939-186193e3250a',
            value: {
              text: 'Exceeded my expectations!',
              label: 'positive'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '5e6f7a8b-9c0d-4d2e-b3a2-3f5e6f7d8a9b',
            created_at: '2024-10-14T16:36:20Z',
            updated_at: '2024-07-13T12:51:18Z'
          }
        ]
      }
    ]
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440000',
    name: 'Image Classification Pipeline',
    metadata: {},
    created_at: '2024-01-10T12:00:00Z',
    updated_at: '2024-02-20T15:30:00Z',
    datasets: [
      {
        id: '3b241101-e2bb-4255-8caf-4136c566a961',
        name: 'ImageNet Preprocessed',
        description: 'Processed ImageNet dataset for classification tasks',
        project_id: '550e8400-e29b-41d4-a716-446655440000',
        is_locked: false,
        metadata: {},
        created_at: '2024-01-15T08:00:00Z',
        updated_at: '2024-02-18T14:45:00Z',
        data: [
          {
            id: 'c9b1d2f0-4c2b-11ee-be56-0242ac120002',
            value: {
              image_path: 's3://bucket/image1.jpg',
              label: 'cat'
            },
            metadata: {
              source: 'ImageNet',
              resolution: '224x224'
            },
            status: 'Pending',
            dataset_id: '3b241101-e2bb-4255-8caf-4136c566a961',
            created_at: '2024-02-10T10:00:00Z',
            updated_at: '2024-02-12T11:00:00Z'
          },
          {
            id: 'c4dbeccd-b549-43f6-b101-811f25a93bf2',
            value: {
              image_path: 's3://bucket/image_ce27349d-238d-4724-8c15-85a1c321774d.jpg',
              label: 'cat'
            },
            metadata: {
              source: 'ImageNet',
              resolution: '224x224'
            },
            status: 'Pending',
            dataset_id: '3b241101-e2bb-4255-8caf-4136c566a961',
            created_at: '2024-05-16T20:16:11Z',
            updated_at: '2024-10-01T08:05:27Z'
          },
          {
            id: '09d2f430-ed5b-4c84-988e-1b8880b9068c',
            value: {
              image_path: 's3://bucket/image_5fcabfeb-a058-4ed1-b372-96a5e967b58b.jpg',
              label: 'dog'
            },
            metadata: {
              source: 'ImageNet',
              resolution: '224x224'
            },
            status: 'Pending',
            dataset_id: '3b241101-e2bb-4255-8caf-4136c566a961',
            created_at: '2024-11-19T07:06:10Z',
            updated_at: '2024-11-13T08:06:52Z'
          },
          {
            id: '3dbaf7bb-8b28-4411-8a86-54381f027408',
            value: {
              image_path: 's3://bucket/image_b0d5f784-43e3-45ae-bb2b-de0d28c6416f.jpg',
              label: 'bird'
            },
            metadata: {
              source: 'ImageNet',
              resolution: '224x224'
            },
            status: 'Process',
            dataset_id: '3b241101-e2bb-4255-8caf-4136c566a961',
            created_at: '2024-12-08T21:10:03Z',
            updated_at: '2024-08-13T20:36:46Z'
          },
          {
            id: '5c55d5bd-0dd5-445f-b1fb-f84df4826a6e',
            value: {
              image_path: 's3://bucket/image_7c5d9b5a-a08a-4a62-9ea4-dc509d4975e3.jpg',
              label: 'car'
            },
            metadata: {
              source: 'ImageNet',
              resolution: '224x224'
            },
            status: 'Process',
            dataset_id: '3b241101-e2bb-4255-8caf-4136c566a961',
            created_at: '2024-08-12T06:47:32Z',
            updated_at: '2024-06-01T20:02:16Z'
          },
          {
            id: '45b7ac95-dda1-4f33-9688-d3b5efe21356',
            value: {
              image_path: 's3://bucket/image_14645b03-3204-40f8-bedb-96396a8905e0.jpg',
              label: 'tree'
            },
            metadata: {
              source: 'ImageNet',
              resolution: '224x224'
            },
            status: 'Process',
            dataset_id: '3b241101-e2bb-4255-8caf-4136c566a961',
            created_at: '2024-08-25T14:23:40Z',
            updated_at: '2024-01-09T02:57:58Z'
          },
          {
            id: '9ca8f735-5783-42e5-81d2-509eff82c07f',
            value: {
              image_path: 's3://bucket/image_2b5c2074-edda-47a3-b0f9-ad5a7577cc3c.jpg',
              label: 'house'
            },
            metadata: {
              source: 'ImageNet',
              resolution: '224x224'
            },
            status: 'Submitted',
            dataset_id: '3b241101-e2bb-4255-8caf-4136c566a961',
            created_at: '2024-04-06T09:05:51Z',
            updated_at: '2024-01-08T17:28:05Z'
          },
          {
            id: '85f2752d-df90-4731-b0d6-6932b5a5b13f',
            value: {
              image_path: 's3://bucket/image_ccd5cb1b-eacd-4284-baea-5c8b34619d0f.jpg',
              label: 'flower'
            },
            metadata: {
              source: 'ImageNet',
              resolution: '224x224'
            },
            status: 'Submitted',
            dataset_id: '3b241101-e2bb-4255-8caf-4136c566a961',
            created_at: '2024-11-30T15:20:05Z',
            updated_at: '2024-02-18T23:41:11Z'
          },
          {
            id: 'ab55f43a-fbbc-4886-9cca-4d9254c5ec45',
            value: {
              image_path: 's3://bucket/image_3ab1080f-8711-4a71-9145-b79923521d89.jpg',
              label: 'person'
            },
            metadata: {
              source: 'ImageNet',
              resolution: '224x224'
            },
            status: 'Process',
            dataset_id: '3b241101-e2bb-4255-8caf-4136c566a961',
            created_at: '2024-12-09T02:13:19Z',
            updated_at: '2024-04-08T13:31:55Z'
          },
          {
            id: '2bd13d9b-f066-451c-9f0e-28958a5e8df5',
            value: {
              image_path: 's3://bucket/image_26eaebf2-2b53-409f-b153-1c17c8b476e6.jpg',
              label: 'food'
            },
            metadata: {
              source: 'ImageNet',
              resolution: '224x224'
            },
            status: 'Pending',
            dataset_id: '3b241101-e2bb-4255-8caf-4136c566a961',
            created_at: '2024-09-25T08:11:46Z',
            updated_at: '2024-06-29T00:05:31Z'
          },
          {
            id: 'e251a069-990e-49f1-9391-085f2cb38362',
            value: {
              image_path: 's3://bucket/image_35d0dbb5-1cf3-48a0-adc3-a5a40b18ad48.jpg',
              label: 'laptop'
            },
            metadata: {
              source: 'ImageNet',
              resolution: '224x224'
            },
            status: 'Pending',
            dataset_id: '3b241101-e2bb-4255-8caf-4136c566a961',
            created_at: '2024-06-13T08:59:39Z',
            updated_at: '2024-12-08T05:25:29Z'
          }
        ]
      }
    ]
  },
  {
    id: 'c8a1cfc0-4c2b-11ee-be56-0242ac120002',
    name: 'NLP Text Classification',
    metadata: {},
    created_at: '2024-02-01T10:00:00Z',
    updated_at: '2024-02-25T16:00:00Z',
    datasets: [
      {
        id: '4a5b6c7d-8e9f-4b0c-b2b1-2e5d8f8f7c6a',
        name: 'Sentiment Analysis Corpus',
        description: 'Labeled dataset for sentiment analysis',
        project_id: 'c8a1cfc0-4c2b-11ee-be56-0242ac120002',
        is_locked: false,
        metadata: {},
        created_at: '2024-02-05T12:00:00Z',
        updated_at: '2024-02-20T14:00:00Z',
        data: [
          {
            id: 'd2a4b5c6-7e8f-490a-92b1-1e3d5c7b6a4f',
            value: {
              text: 'This product is amazing!',
              label: 'positive'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '4a5b6c7d-8e9f-4b0c-b2b1-2e5d8f8f7c6a',
            created_at: '2024-02-10T14:20:00Z',
            updated_at: '2024-02-12T15:30:00Z'
          },
          {
            id: '8791e4b7-63b0-41bf-ab20-8e387654caf2',
            value: {
              text: 'This product is amazing!',
              label: 'positive'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '4a5b6c7d-8e9f-4b0c-b2b1-2e5d8f8f7c6a',
            created_at: '2024-02-27T12:01:05Z',
            updated_at: '2024-11-26T00:07:29Z'
          },
          {
            id: '3903d3c6-b9fd-4cab-9192-af6aa12848cd',
            value: {
              text: 'I had a terrible experience.',
              label: 'negative'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '4a5b6c7d-8e9f-4b0c-b2b1-2e5d8f8f7c6a',
            created_at: '2024-05-05T21:27:44Z',
            updated_at: '2024-07-29T03:51:03Z'
          },
          {
            id: 'd3a2af05-287c-4f05-aab9-c77b3cd31a98',
            value: {
              text: 'The movie was just okay.',
              label: 'neutral'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '4a5b6c7d-8e9f-4b0c-b2b1-2e5d8f8f7c6a',
            created_at: '2024-06-21T08:46:23Z',
            updated_at: '2024-07-03T00:11:40Z'
          },
          {
            id: 'dee3e78d-9c1d-44e7-b838-12c8a11871e6',
            value: {
              text: 'Fantastic service, highly recommend!',
              label: 'positive'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Process',
            dataset_id: '4a5b6c7d-8e9f-4b0c-b2b1-2e5d8f8f7c6a',
            created_at: '2024-04-22T13:51:33Z',
            updated_at: '2024-06-05T06:49:54Z'
          },
          {
            id: '7df7b902-34c0-4c1f-9ace-51f38c5a119f',
            value: {
              text: 'Not worth the money.',
              label: 'negative'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Process',
            dataset_id: '4a5b6c7d-8e9f-4b0c-b2b1-2e5d8f8f7c6a',
            created_at: '2024-01-03T16:46:26Z',
            updated_at: '2024-02-18T19:01:40Z'
          },
          {
            id: 'f09dbf9e-5df5-4d2f-a96c-8e85e57dadc6',
            value: {
              text: 'I love this phone, great battery life!',
              label: 'positive'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '4a5b6c7d-8e9f-4b0c-b2b1-2e5d8f8f7c6a',
            created_at: '2024-06-15T01:27:03Z',
            updated_at: '2024-08-11T11:30:51Z'
          },
          {
            id: 'cb19ba55-265e-4b4c-98c6-ca3e36cdc3d1',
            value: {
              text: 'Customer support was unhelpful.',
              label: 'negative'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '4a5b6c7d-8e9f-4b0c-b2b1-2e5d8f8f7c6a',
            created_at: '2024-12-31T13:11:14Z',
            updated_at: '2024-11-11T00:57:06Z'
          },
          {
            id: '56b241f3-e78d-4383-98ab-74ff90ac7778',
            value: {
              text: 'A must-buy for gamers.',
              label: 'positive'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Pending',
            dataset_id: '4a5b6c7d-8e9f-4b0c-b2b1-2e5d8f8f7c6a',
            created_at: '2024-07-31T03:49:36Z',
            updated_at: '2024-08-13T09:45:28Z'
          },
          {
            id: '56b944eb-6528-49f0-8a1e-26c1044fecef',
            value: {
              text: 'The quality could be better.',
              label: 'neutral'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '4a5b6c7d-8e9f-4b0c-b2b1-2e5d8f8f7c6a',
            created_at: '2024-01-26T08:47:21Z',
            updated_at: '2024-02-26T13:59:24Z'
          },
          {
            id: '470d0b6c-b3bf-4ead-84cc-115d69282461',
            value: {
              text: 'Exceeded my expectations!',
              label: 'positive'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Pending',
            dataset_id: '4a5b6c7d-8e9f-4b0c-b2b1-2e5d8f8f7c6a',
            created_at: '2024-10-25T05:03:19Z',
            updated_at: '2024-07-29T09:00:30Z'
          }
        ]
      },
      {
        id: '5e6f7a8b-9c0d-4d2e-b3a2-3f5e6f7d8a9b',
        name: 'News Classification Dataset',
        description: 'News articles categorized by topic',
        project_id: 'c8a1cfc0-4c2b-11ee-be56-0242ac120002',
        is_locked: false,
        metadata: {},
        created_at: '2024-02-08T11:00:00Z',
        updated_at: '2024-02-22T17:00:00Z',
        data: [
          {
            id: '6f2e3304-6950-474c-b7c4-e190f4ad1a2b',
            value: {
              text: 'This product is amazing!',
              label: 'positive'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '5e6f7a8b-9c0d-4d2e-b3a2-3f5e6f7d8a9b',
            created_at: '2024-04-24T06:54:53Z',
            updated_at: '2024-06-25T17:59:04Z'
          },
          {
            id: '0bc90e91-5c7e-48bf-adb5-e6f530e0b421',
            value: {
              text: 'I had a terrible experience.',
              label: 'negative'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '5e6f7a8b-9c0d-4d2e-b3a2-3f5e6f7d8a9b',
            created_at: '2024-04-18T05:30:12Z',
            updated_at: '2024-10-15T08:07:55Z'
          },
          {
            id: '21c84c90-8693-424e-89d0-23f96f264bae',
            value: {
              text: 'The movie was just okay.',
              label: 'neutral'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '5e6f7a8b-9c0d-4d2e-b3a2-3f5e6f7d8a9b',
            created_at: '2024-09-01T02:15:55Z',
            updated_at: '2024-02-01T02:22:49Z'
          },
          {
            id: '2530e6f6-52b5-4217-80c6-91d0e68565f4',
            value: {
              text: 'Fantastic service, highly recommend!',
              label: 'positive'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '5e6f7a8b-9c0d-4d2e-b3a2-3f5e6f7d8a9b',
            created_at: '2024-07-30T00:42:14Z',
            updated_at: '2024-05-20T17:32:40Z'
          },
          {
            id: '061624db-5e4f-4974-8051-8af2669484ff',
            value: {
              text: 'Not worth the money.',
              label: 'negative'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '5e6f7a8b-9c0d-4d2e-b3a2-3f5e6f7d8a9b',
            created_at: '2024-07-16T15:33:03Z',
            updated_at: '2024-09-04T10:39:15Z'
          },
          {
            id: '27d913b8-6453-4916-a19f-11bd10222add',
            value: {
              text: 'I love this phone, great battery life!',
              label: 'positive'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '5e6f7a8b-9c0d-4d2e-b3a2-3f5e6f7d8a9b',
            created_at: '2024-10-31T12:20:05Z',
            updated_at: '2024-10-14T05:01:10Z'
          },
          {
            id: 'b1a153a5-769a-4520-8cce-d3a516a52f12',
            value: {
              text: 'Customer support was unhelpful.',
              label: 'negative'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '5e6f7a8b-9c0d-4d2e-b3a2-3f5e6f7d8a9b',
            created_at: '2024-06-14T20:48:41Z',
            updated_at: '2024-06-24T22:18:12Z'
          },
          {
            id: 'e6c92438-3eab-4ae3-bb8b-fac4616add43',
            value: {
              text: 'A must-buy for gamers.',
              label: 'positive'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '5e6f7a8b-9c0d-4d2e-b3a2-3f5e6f7d8a9b',
            created_at: '2024-10-06T18:20:13Z',
            updated_at: '2024-09-26T05:20:11Z'
          },
          {
            id: '29df90bf-4fbe-480b-8aba-a59c9928846f',
            value: {
              text: 'The quality could be better.',
              label: 'neutral'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '5e6f7a8b-9c0d-4d2e-b3a2-3f5e6f7d8a9b',
            created_at: '2024-10-16T12:19:38Z',
            updated_at: '2024-09-20T00:27:36Z'
          },
          {
            id: '589230f1-7bdc-431b-a939-186193e3250a',
            value: {
              text: 'Exceeded my expectations!',
              label: 'positive'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '5e6f7a8b-9c0d-4d2e-b3a2-3f5e6f7d8a9b',
            created_at: '2024-10-14T16:36:20Z',
            updated_at: '2024-07-13T12:51:18Z'
          }
        ]
      }
    ]
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440000',
    name: 'Image Classification Pipeline',
    metadata: {},
    created_at: '2024-01-10T12:00:00Z',
    updated_at: '2024-02-20T15:30:00Z',
    datasets: [
      {
        id: '3b241101-e2bb-4255-8caf-4136c566a961',
        name: 'ImageNet Preprocessed',
        description: 'Processed ImageNet dataset for classification tasks',
        project_id: '550e8400-e29b-41d4-a716-446655440000',
        is_locked: false,
        metadata: {},
        created_at: '2024-01-15T08:00:00Z',
        updated_at: '2024-02-18T14:45:00Z',
        data: [
          {
            id: 'c9b1d2f0-4c2b-11ee-be56-0242ac120002',
            value: {
              image_path: 's3://bucket/image1.jpg',
              label: 'cat'
            },
            metadata: {
              source: 'ImageNet',
              resolution: '224x224'
            },
            status: 'Pending',
            dataset_id: '3b241101-e2bb-4255-8caf-4136c566a961',
            created_at: '2024-02-10T10:00:00Z',
            updated_at: '2024-02-12T11:00:00Z'
          },
          {
            id: 'c4dbeccd-b549-43f6-b101-811f25a93bf2',
            value: {
              image_path: 's3://bucket/image_ce27349d-238d-4724-8c15-85a1c321774d.jpg',
              label: 'cat'
            },
            metadata: {
              source: 'ImageNet',
              resolution: '224x224'
            },
            status: 'Pending',
            dataset_id: '3b241101-e2bb-4255-8caf-4136c566a961',
            created_at: '2024-05-16T20:16:11Z',
            updated_at: '2024-10-01T08:05:27Z'
          },
          {
            id: '09d2f430-ed5b-4c84-988e-1b8880b9068c',
            value: {
              image_path: 's3://bucket/image_5fcabfeb-a058-4ed1-b372-96a5e967b58b.jpg',
              label: 'dog'
            },
            metadata: {
              source: 'ImageNet',
              resolution: '224x224'
            },
            status: 'Pending',
            dataset_id: '3b241101-e2bb-4255-8caf-4136c566a961',
            created_at: '2024-11-19T07:06:10Z',
            updated_at: '2024-11-13T08:06:52Z'
          },
          {
            id: '3dbaf7bb-8b28-4411-8a86-54381f027408',
            value: {
              image_path: 's3://bucket/image_b0d5f784-43e3-45ae-bb2b-de0d28c6416f.jpg',
              label: 'bird'
            },
            metadata: {
              source: 'ImageNet',
              resolution: '224x224'
            },
            status: 'Process',
            dataset_id: '3b241101-e2bb-4255-8caf-4136c566a961',
            created_at: '2024-12-08T21:10:03Z',
            updated_at: '2024-08-13T20:36:46Z'
          },
          {
            id: '5c55d5bd-0dd5-445f-b1fb-f84df4826a6e',
            value: {
              image_path: 's3://bucket/image_7c5d9b5a-a08a-4a62-9ea4-dc509d4975e3.jpg',
              label: 'car'
            },
            metadata: {
              source: 'ImageNet',
              resolution: '224x224'
            },
            status: 'Process',
            dataset_id: '3b241101-e2bb-4255-8caf-4136c566a961',
            created_at: '2024-08-12T06:47:32Z',
            updated_at: '2024-06-01T20:02:16Z'
          },
          {
            id: '45b7ac95-dda1-4f33-9688-d3b5efe21356',
            value: {
              image_path: 's3://bucket/image_14645b03-3204-40f8-bedb-96396a8905e0.jpg',
              label: 'tree'
            },
            metadata: {
              source: 'ImageNet',
              resolution: '224x224'
            },
            status: 'Process',
            dataset_id: '3b241101-e2bb-4255-8caf-4136c566a961',
            created_at: '2024-08-25T14:23:40Z',
            updated_at: '2024-01-09T02:57:58Z'
          },
          {
            id: '9ca8f735-5783-42e5-81d2-509eff82c07f',
            value: {
              image_path: 's3://bucket/image_2b5c2074-edda-47a3-b0f9-ad5a7577cc3c.jpg',
              label: 'house'
            },
            metadata: {
              source: 'ImageNet',
              resolution: '224x224'
            },
            status: 'Submitted',
            dataset_id: '3b241101-e2bb-4255-8caf-4136c566a961',
            created_at: '2024-04-06T09:05:51Z',
            updated_at: '2024-01-08T17:28:05Z'
          },
          {
            id: '85f2752d-df90-4731-b0d6-6932b5a5b13f',
            value: {
              image_path: 's3://bucket/image_ccd5cb1b-eacd-4284-baea-5c8b34619d0f.jpg',
              label: 'flower'
            },
            metadata: {
              source: 'ImageNet',
              resolution: '224x224'
            },
            status: 'Submitted',
            dataset_id: '3b241101-e2bb-4255-8caf-4136c566a961',
            created_at: '2024-11-30T15:20:05Z',
            updated_at: '2024-02-18T23:41:11Z'
          },
          {
            id: 'ab55f43a-fbbc-4886-9cca-4d9254c5ec45',
            value: {
              image_path: 's3://bucket/image_3ab1080f-8711-4a71-9145-b79923521d89.jpg',
              label: 'person'
            },
            metadata: {
              source: 'ImageNet',
              resolution: '224x224'
            },
            status: 'Process',
            dataset_id: '3b241101-e2bb-4255-8caf-4136c566a961',
            created_at: '2024-12-09T02:13:19Z',
            updated_at: '2024-04-08T13:31:55Z'
          },
          {
            id: '2bd13d9b-f066-451c-9f0e-28958a5e8df5',
            value: {
              image_path: 's3://bucket/image_26eaebf2-2b53-409f-b153-1c17c8b476e6.jpg',
              label: 'food'
            },
            metadata: {
              source: 'ImageNet',
              resolution: '224x224'
            },
            status: 'Pending',
            dataset_id: '3b241101-e2bb-4255-8caf-4136c566a961',
            created_at: '2024-09-25T08:11:46Z',
            updated_at: '2024-06-29T00:05:31Z'
          },
          {
            id: 'e251a069-990e-49f1-9391-085f2cb38362',
            value: {
              image_path: 's3://bucket/image_35d0dbb5-1cf3-48a0-adc3-a5a40b18ad48.jpg',
              label: 'laptop'
            },
            metadata: {
              source: 'ImageNet',
              resolution: '224x224'
            },
            status: 'Pending',
            dataset_id: '3b241101-e2bb-4255-8caf-4136c566a961',
            created_at: '2024-06-13T08:59:39Z',
            updated_at: '2024-12-08T05:25:29Z'
          }
        ]
      }
    ]
  },
  {
    id: 'c8a1cfc0-4c2b-11ee-be56-0242ac120002',
    name: 'NLP Text Classification',
    metadata: {},
    created_at: '2024-02-01T10:00:00Z',
    updated_at: '2024-02-25T16:00:00Z',
    datasets: [
      {
        id: '4a5b6c7d-8e9f-4b0c-b2b1-2e5d8f8f7c6a',
        name: 'Sentiment Analysis Corpus',
        description: 'Labeled dataset for sentiment analysis',
        project_id: 'c8a1cfc0-4c2b-11ee-be56-0242ac120002',
        is_locked: false,
        metadata: {},
        created_at: '2024-02-05T12:00:00Z',
        updated_at: '2024-02-20T14:00:00Z',
        data: [
          {
            id: 'd2a4b5c6-7e8f-490a-92b1-1e3d5c7b6a4f',
            value: {
              text: 'This product is amazing!',
              label: 'positive'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '4a5b6c7d-8e9f-4b0c-b2b1-2e5d8f8f7c6a',
            created_at: '2024-02-10T14:20:00Z',
            updated_at: '2024-02-12T15:30:00Z'
          },
          {
            id: '8791e4b7-63b0-41bf-ab20-8e387654caf2',
            value: {
              text: 'This product is amazing!',
              label: 'positive'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '4a5b6c7d-8e9f-4b0c-b2b1-2e5d8f8f7c6a',
            created_at: '2024-02-27T12:01:05Z',
            updated_at: '2024-11-26T00:07:29Z'
          },
          {
            id: '3903d3c6-b9fd-4cab-9192-af6aa12848cd',
            value: {
              text: 'I had a terrible experience.',
              label: 'negative'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '4a5b6c7d-8e9f-4b0c-b2b1-2e5d8f8f7c6a',
            created_at: '2024-05-05T21:27:44Z',
            updated_at: '2024-07-29T03:51:03Z'
          },
          {
            id: 'd3a2af05-287c-4f05-aab9-c77b3cd31a98',
            value: {
              text: 'The movie was just okay.',
              label: 'neutral'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '4a5b6c7d-8e9f-4b0c-b2b1-2e5d8f8f7c6a',
            created_at: '2024-06-21T08:46:23Z',
            updated_at: '2024-07-03T00:11:40Z'
          },
          {
            id: 'dee3e78d-9c1d-44e7-b838-12c8a11871e6',
            value: {
              text: 'Fantastic service, highly recommend!',
              label: 'positive'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Process',
            dataset_id: '4a5b6c7d-8e9f-4b0c-b2b1-2e5d8f8f7c6a',
            created_at: '2024-04-22T13:51:33Z',
            updated_at: '2024-06-05T06:49:54Z'
          },
          {
            id: '7df7b902-34c0-4c1f-9ace-51f38c5a119f',
            value: {
              text: 'Not worth the money.',
              label: 'negative'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Process',
            dataset_id: '4a5b6c7d-8e9f-4b0c-b2b1-2e5d8f8f7c6a',
            created_at: '2024-01-03T16:46:26Z',
            updated_at: '2024-02-18T19:01:40Z'
          },
          {
            id: 'f09dbf9e-5df5-4d2f-a96c-8e85e57dadc6',
            value: {
              text: 'I love this phone, great battery life!',
              label: 'positive'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '4a5b6c7d-8e9f-4b0c-b2b1-2e5d8f8f7c6a',
            created_at: '2024-06-15T01:27:03Z',
            updated_at: '2024-08-11T11:30:51Z'
          },
          {
            id: 'cb19ba55-265e-4b4c-98c6-ca3e36cdc3d1',
            value: {
              text: 'Customer support was unhelpful.',
              label: 'negative'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '4a5b6c7d-8e9f-4b0c-b2b1-2e5d8f8f7c6a',
            created_at: '2024-12-31T13:11:14Z',
            updated_at: '2024-11-11T00:57:06Z'
          },
          {
            id: '56b241f3-e78d-4383-98ab-74ff90ac7778',
            value: {
              text: 'A must-buy for gamers.',
              label: 'positive'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Pending',
            dataset_id: '4a5b6c7d-8e9f-4b0c-b2b1-2e5d8f8f7c6a',
            created_at: '2024-07-31T03:49:36Z',
            updated_at: '2024-08-13T09:45:28Z'
          },
          {
            id: '56b944eb-6528-49f0-8a1e-26c1044fecef',
            value: {
              text: 'The quality could be better.',
              label: 'neutral'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '4a5b6c7d-8e9f-4b0c-b2b1-2e5d8f8f7c6a',
            created_at: '2024-01-26T08:47:21Z',
            updated_at: '2024-02-26T13:59:24Z'
          },
          {
            id: '470d0b6c-b3bf-4ead-84cc-115d69282461',
            value: {
              text: 'Exceeded my expectations!',
              label: 'positive'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Pending',
            dataset_id: '4a5b6c7d-8e9f-4b0c-b2b1-2e5d8f8f7c6a',
            created_at: '2024-10-25T05:03:19Z',
            updated_at: '2024-07-29T09:00:30Z'
          }
        ]
      },
      {
        id: '5e6f7a8b-9c0d-4d2e-b3a2-3f5e6f7d8a9b',
        name: 'News Classification Dataset',
        description: 'News articles categorized by topic',
        project_id: 'c8a1cfc0-4c2b-11ee-be56-0242ac120002',
        is_locked: false,
        metadata: {},
        created_at: '2024-02-08T11:00:00Z',
        updated_at: '2024-02-22T17:00:00Z',
        data: [
          {
            id: '6f2e3304-6950-474c-b7c4-e190f4ad1a2b',
            value: {
              text: 'This product is amazing!',
              label: 'positive'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '5e6f7a8b-9c0d-4d2e-b3a2-3f5e6f7d8a9b',
            created_at: '2024-04-24T06:54:53Z',
            updated_at: '2024-06-25T17:59:04Z'
          },
          {
            id: '0bc90e91-5c7e-48bf-adb5-e6f530e0b421',
            value: {
              text: 'I had a terrible experience.',
              label: 'negative'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '5e6f7a8b-9c0d-4d2e-b3a2-3f5e6f7d8a9b',
            created_at: '2024-04-18T05:30:12Z',
            updated_at: '2024-10-15T08:07:55Z'
          },
          {
            id: '21c84c90-8693-424e-89d0-23f96f264bae',
            value: {
              text: 'The movie was just okay.',
              label: 'neutral'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '5e6f7a8b-9c0d-4d2e-b3a2-3f5e6f7d8a9b',
            created_at: '2024-09-01T02:15:55Z',
            updated_at: '2024-02-01T02:22:49Z'
          },
          {
            id: '2530e6f6-52b5-4217-80c6-91d0e68565f4',
            value: {
              text: 'Fantastic service, highly recommend!',
              label: 'positive'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '5e6f7a8b-9c0d-4d2e-b3a2-3f5e6f7d8a9b',
            created_at: '2024-07-30T00:42:14Z',
            updated_at: '2024-05-20T17:32:40Z'
          },
          {
            id: '061624db-5e4f-4974-8051-8af2669484ff',
            value: {
              text: 'Not worth the money.',
              label: 'negative'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '5e6f7a8b-9c0d-4d2e-b3a2-3f5e6f7d8a9b',
            created_at: '2024-07-16T15:33:03Z',
            updated_at: '2024-09-04T10:39:15Z'
          },
          {
            id: '27d913b8-6453-4916-a19f-11bd10222add',
            value: {
              text: 'I love this phone, great battery life!',
              label: 'positive'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '5e6f7a8b-9c0d-4d2e-b3a2-3f5e6f7d8a9b',
            created_at: '2024-10-31T12:20:05Z',
            updated_at: '2024-10-14T05:01:10Z'
          },
          {
            id: 'b1a153a5-769a-4520-8cce-d3a516a52f12',
            value: {
              text: 'Customer support was unhelpful.',
              label: 'negative'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '5e6f7a8b-9c0d-4d2e-b3a2-3f5e6f7d8a9b',
            created_at: '2024-06-14T20:48:41Z',
            updated_at: '2024-06-24T22:18:12Z'
          },
          {
            id: 'e6c92438-3eab-4ae3-bb8b-fac4616add43',
            value: {
              text: 'A must-buy for gamers.',
              label: 'positive'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '5e6f7a8b-9c0d-4d2e-b3a2-3f5e6f7d8a9b',
            created_at: '2024-10-06T18:20:13Z',
            updated_at: '2024-09-26T05:20:11Z'
          },
          {
            id: '29df90bf-4fbe-480b-8aba-a59c9928846f',
            value: {
              text: 'The quality could be better.',
              label: 'neutral'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '5e6f7a8b-9c0d-4d2e-b3a2-3f5e6f7d8a9b',
            created_at: '2024-10-16T12:19:38Z',
            updated_at: '2024-09-20T00:27:36Z'
          },
          {
            id: '589230f1-7bdc-431b-a939-186193e3250a',
            value: {
              text: 'Exceeded my expectations!',
              label: 'positive'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '5e6f7a8b-9c0d-4d2e-b3a2-3f5e6f7d8a9b',
            created_at: '2024-10-14T16:36:20Z',
            updated_at: '2024-07-13T12:51:18Z'
          }
        ]
      }
    ]
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440000',
    name: 'Image Classification Pipeline',
    metadata: {},
    created_at: '2024-01-10T12:00:00Z',
    updated_at: '2024-02-20T15:30:00Z',
    datasets: [
      {
        id: '3b241101-e2bb-4255-8caf-4136c566a961',
        name: 'ImageNet Preprocessed',
        description: 'Processed ImageNet dataset for classification tasks',
        project_id: '550e8400-e29b-41d4-a716-446655440000',
        is_locked: false,
        metadata: {},
        created_at: '2024-01-15T08:00:00Z',
        updated_at: '2024-02-18T14:45:00Z',
        data: [
          {
            id: 'c9b1d2f0-4c2b-11ee-be56-0242ac120002',
            value: {
              image_path: 's3://bucket/image1.jpg',
              label: 'cat'
            },
            metadata: {
              source: 'ImageNet',
              resolution: '224x224'
            },
            status: 'Pending',
            dataset_id: '3b241101-e2bb-4255-8caf-4136c566a961',
            created_at: '2024-02-10T10:00:00Z',
            updated_at: '2024-02-12T11:00:00Z'
          },
          {
            id: 'c4dbeccd-b549-43f6-b101-811f25a93bf2',
            value: {
              image_path: 's3://bucket/image_ce27349d-238d-4724-8c15-85a1c321774d.jpg',
              label: 'cat'
            },
            metadata: {
              source: 'ImageNet',
              resolution: '224x224'
            },
            status: 'Pending',
            dataset_id: '3b241101-e2bb-4255-8caf-4136c566a961',
            created_at: '2024-05-16T20:16:11Z',
            updated_at: '2024-10-01T08:05:27Z'
          },
          {
            id: '09d2f430-ed5b-4c84-988e-1b8880b9068c',
            value: {
              image_path: 's3://bucket/image_5fcabfeb-a058-4ed1-b372-96a5e967b58b.jpg',
              label: 'dog'
            },
            metadata: {
              source: 'ImageNet',
              resolution: '224x224'
            },
            status: 'Pending',
            dataset_id: '3b241101-e2bb-4255-8caf-4136c566a961',
            created_at: '2024-11-19T07:06:10Z',
            updated_at: '2024-11-13T08:06:52Z'
          },
          {
            id: '3dbaf7bb-8b28-4411-8a86-54381f027408',
            value: {
              image_path: 's3://bucket/image_b0d5f784-43e3-45ae-bb2b-de0d28c6416f.jpg',
              label: 'bird'
            },
            metadata: {
              source: 'ImageNet',
              resolution: '224x224'
            },
            status: 'Process',
            dataset_id: '3b241101-e2bb-4255-8caf-4136c566a961',
            created_at: '2024-12-08T21:10:03Z',
            updated_at: '2024-08-13T20:36:46Z'
          },
          {
            id: '5c55d5bd-0dd5-445f-b1fb-f84df4826a6e',
            value: {
              image_path: 's3://bucket/image_7c5d9b5a-a08a-4a62-9ea4-dc509d4975e3.jpg',
              label: 'car'
            },
            metadata: {
              source: 'ImageNet',
              resolution: '224x224'
            },
            status: 'Process',
            dataset_id: '3b241101-e2bb-4255-8caf-4136c566a961',
            created_at: '2024-08-12T06:47:32Z',
            updated_at: '2024-06-01T20:02:16Z'
          },
          {
            id: '45b7ac95-dda1-4f33-9688-d3b5efe21356',
            value: {
              image_path: 's3://bucket/image_14645b03-3204-40f8-bedb-96396a8905e0.jpg',
              label: 'tree'
            },
            metadata: {
              source: 'ImageNet',
              resolution: '224x224'
            },
            status: 'Process',
            dataset_id: '3b241101-e2bb-4255-8caf-4136c566a961',
            created_at: '2024-08-25T14:23:40Z',
            updated_at: '2024-01-09T02:57:58Z'
          },
          {
            id: '9ca8f735-5783-42e5-81d2-509eff82c07f',
            value: {
              image_path: 's3://bucket/image_2b5c2074-edda-47a3-b0f9-ad5a7577cc3c.jpg',
              label: 'house'
            },
            metadata: {
              source: 'ImageNet',
              resolution: '224x224'
            },
            status: 'Submitted',
            dataset_id: '3b241101-e2bb-4255-8caf-4136c566a961',
            created_at: '2024-04-06T09:05:51Z',
            updated_at: '2024-01-08T17:28:05Z'
          },
          {
            id: '85f2752d-df90-4731-b0d6-6932b5a5b13f',
            value: {
              image_path: 's3://bucket/image_ccd5cb1b-eacd-4284-baea-5c8b34619d0f.jpg',
              label: 'flower'
            },
            metadata: {
              source: 'ImageNet',
              resolution: '224x224'
            },
            status: 'Submitted',
            dataset_id: '3b241101-e2bb-4255-8caf-4136c566a961',
            created_at: '2024-11-30T15:20:05Z',
            updated_at: '2024-02-18T23:41:11Z'
          },
          {
            id: 'ab55f43a-fbbc-4886-9cca-4d9254c5ec45',
            value: {
              image_path: 's3://bucket/image_3ab1080f-8711-4a71-9145-b79923521d89.jpg',
              label: 'person'
            },
            metadata: {
              source: 'ImageNet',
              resolution: '224x224'
            },
            status: 'Process',
            dataset_id: '3b241101-e2bb-4255-8caf-4136c566a961',
            created_at: '2024-12-09T02:13:19Z',
            updated_at: '2024-04-08T13:31:55Z'
          },
          {
            id: '2bd13d9b-f066-451c-9f0e-28958a5e8df5',
            value: {
              image_path: 's3://bucket/image_26eaebf2-2b53-409f-b153-1c17c8b476e6.jpg',
              label: 'food'
            },
            metadata: {
              source: 'ImageNet',
              resolution: '224x224'
            },
            status: 'Pending',
            dataset_id: '3b241101-e2bb-4255-8caf-4136c566a961',
            created_at: '2024-09-25T08:11:46Z',
            updated_at: '2024-06-29T00:05:31Z'
          },
          {
            id: 'e251a069-990e-49f1-9391-085f2cb38362',
            value: {
              image_path: 's3://bucket/image_35d0dbb5-1cf3-48a0-adc3-a5a40b18ad48.jpg',
              label: 'laptop'
            },
            metadata: {
              source: 'ImageNet',
              resolution: '224x224'
            },
            status: 'Pending',
            dataset_id: '3b241101-e2bb-4255-8caf-4136c566a961',
            created_at: '2024-06-13T08:59:39Z',
            updated_at: '2024-12-08T05:25:29Z'
          }
        ]
      }
    ]
  },
  {
    id: 'c8a1cfc0-4c2b-11ee-be56-0242ac120002',
    name: 'NLP Text Classification',
    metadata: {},
    created_at: '2024-02-01T10:00:00Z',
    updated_at: '2024-02-25T16:00:00Z',
    datasets: [
      {
        id: '4a5b6c7d-8e9f-4b0c-b2b1-2e5d8f8f7c6a',
        name: 'Sentiment Analysis Corpus',
        description: 'Labeled dataset for sentiment analysis',
        project_id: 'c8a1cfc0-4c2b-11ee-be56-0242ac120002',
        is_locked: false,
        metadata: {},
        created_at: '2024-02-05T12:00:00Z',
        updated_at: '2024-02-20T14:00:00Z',
        data: [
          {
            id: 'd2a4b5c6-7e8f-490a-92b1-1e3d5c7b6a4f',
            value: {
              text: 'This product is amazing!',
              label: 'positive'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '4a5b6c7d-8e9f-4b0c-b2b1-2e5d8f8f7c6a',
            created_at: '2024-02-10T14:20:00Z',
            updated_at: '2024-02-12T15:30:00Z'
          },
          {
            id: '8791e4b7-63b0-41bf-ab20-8e387654caf2',
            value: {
              text: 'This product is amazing!',
              label: 'positive'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '4a5b6c7d-8e9f-4b0c-b2b1-2e5d8f8f7c6a',
            created_at: '2024-02-27T12:01:05Z',
            updated_at: '2024-11-26T00:07:29Z'
          },
          {
            id: '3903d3c6-b9fd-4cab-9192-af6aa12848cd',
            value: {
              text: 'I had a terrible experience.',
              label: 'negative'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '4a5b6c7d-8e9f-4b0c-b2b1-2e5d8f8f7c6a',
            created_at: '2024-05-05T21:27:44Z',
            updated_at: '2024-07-29T03:51:03Z'
          },
          {
            id: 'd3a2af05-287c-4f05-aab9-c77b3cd31a98',
            value: {
              text: 'The movie was just okay.',
              label: 'neutral'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '4a5b6c7d-8e9f-4b0c-b2b1-2e5d8f8f7c6a',
            created_at: '2024-06-21T08:46:23Z',
            updated_at: '2024-07-03T00:11:40Z'
          },
          {
            id: 'dee3e78d-9c1d-44e7-b838-12c8a11871e6',
            value: {
              text: 'Fantastic service, highly recommend!',
              label: 'positive'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Process',
            dataset_id: '4a5b6c7d-8e9f-4b0c-b2b1-2e5d8f8f7c6a',
            created_at: '2024-04-22T13:51:33Z',
            updated_at: '2024-06-05T06:49:54Z'
          },
          {
            id: '7df7b902-34c0-4c1f-9ace-51f38c5a119f',
            value: {
              text: 'Not worth the money.',
              label: 'negative'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Process',
            dataset_id: '4a5b6c7d-8e9f-4b0c-b2b1-2e5d8f8f7c6a',
            created_at: '2024-01-03T16:46:26Z',
            updated_at: '2024-02-18T19:01:40Z'
          },
          {
            id: 'f09dbf9e-5df5-4d2f-a96c-8e85e57dadc6',
            value: {
              text: 'I love this phone, great battery life!',
              label: 'positive'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '4a5b6c7d-8e9f-4b0c-b2b1-2e5d8f8f7c6a',
            created_at: '2024-06-15T01:27:03Z',
            updated_at: '2024-08-11T11:30:51Z'
          },
          {
            id: 'cb19ba55-265e-4b4c-98c6-ca3e36cdc3d1',
            value: {
              text: 'Customer support was unhelpful.',
              label: 'negative'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '4a5b6c7d-8e9f-4b0c-b2b1-2e5d8f8f7c6a',
            created_at: '2024-12-31T13:11:14Z',
            updated_at: '2024-11-11T00:57:06Z'
          },
          {
            id: '56b241f3-e78d-4383-98ab-74ff90ac7778',
            value: {
              text: 'A must-buy for gamers.',
              label: 'positive'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Pending',
            dataset_id: '4a5b6c7d-8e9f-4b0c-b2b1-2e5d8f8f7c6a',
            created_at: '2024-07-31T03:49:36Z',
            updated_at: '2024-08-13T09:45:28Z'
          },
          {
            id: '56b944eb-6528-49f0-8a1e-26c1044fecef',
            value: {
              text: 'The quality could be better.',
              label: 'neutral'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '4a5b6c7d-8e9f-4b0c-b2b1-2e5d8f8f7c6a',
            created_at: '2024-01-26T08:47:21Z',
            updated_at: '2024-02-26T13:59:24Z'
          },
          {
            id: '470d0b6c-b3bf-4ead-84cc-115d69282461',
            value: {
              text: 'Exceeded my expectations!',
              label: 'positive'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Pending',
            dataset_id: '4a5b6c7d-8e9f-4b0c-b2b1-2e5d8f8f7c6a',
            created_at: '2024-10-25T05:03:19Z',
            updated_at: '2024-07-29T09:00:30Z'
          }
        ]
      },
      {
        id: '5e6f7a8b-9c0d-4d2e-b3a2-3f5e6f7d8a9b',
        name: 'News Classification Dataset',
        description: 'News articles categorized by topic',
        project_id: 'c8a1cfc0-4c2b-11ee-be56-0242ac120002',
        is_locked: false,
        metadata: {},
        created_at: '2024-02-08T11:00:00Z',
        updated_at: '2024-02-22T17:00:00Z',
        data: [
          {
            id: '6f2e3304-6950-474c-b7c4-e190f4ad1a2b',
            value: {
              text: 'This product is amazing!',
              label: 'positive'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '5e6f7a8b-9c0d-4d2e-b3a2-3f5e6f7d8a9b',
            created_at: '2024-04-24T06:54:53Z',
            updated_at: '2024-06-25T17:59:04Z'
          },
          {
            id: '0bc90e91-5c7e-48bf-adb5-e6f530e0b421',
            value: {
              text: 'I had a terrible experience.',
              label: 'negative'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '5e6f7a8b-9c0d-4d2e-b3a2-3f5e6f7d8a9b',
            created_at: '2024-04-18T05:30:12Z',
            updated_at: '2024-10-15T08:07:55Z'
          },
          {
            id: '21c84c90-8693-424e-89d0-23f96f264bae',
            value: {
              text: 'The movie was just okay.',
              label: 'neutral'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '5e6f7a8b-9c0d-4d2e-b3a2-3f5e6f7d8a9b',
            created_at: '2024-09-01T02:15:55Z',
            updated_at: '2024-02-01T02:22:49Z'
          },
          {
            id: '2530e6f6-52b5-4217-80c6-91d0e68565f4',
            value: {
              text: 'Fantastic service, highly recommend!',
              label: 'positive'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '5e6f7a8b-9c0d-4d2e-b3a2-3f5e6f7d8a9b',
            created_at: '2024-07-30T00:42:14Z',
            updated_at: '2024-05-20T17:32:40Z'
          },
          {
            id: '061624db-5e4f-4974-8051-8af2669484ff',
            value: {
              text: 'Not worth the money.',
              label: 'negative'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '5e6f7a8b-9c0d-4d2e-b3a2-3f5e6f7d8a9b',
            created_at: '2024-07-16T15:33:03Z',
            updated_at: '2024-09-04T10:39:15Z'
          },
          {
            id: '27d913b8-6453-4916-a19f-11bd10222add',
            value: {
              text: 'I love this phone, great battery life!',
              label: 'positive'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '5e6f7a8b-9c0d-4d2e-b3a2-3f5e6f7d8a9b',
            created_at: '2024-10-31T12:20:05Z',
            updated_at: '2024-10-14T05:01:10Z'
          },
          {
            id: 'b1a153a5-769a-4520-8cce-d3a516a52f12',
            value: {
              text: 'Customer support was unhelpful.',
              label: 'negative'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '5e6f7a8b-9c0d-4d2e-b3a2-3f5e6f7d8a9b',
            created_at: '2024-06-14T20:48:41Z',
            updated_at: '2024-06-24T22:18:12Z'
          },
          {
            id: 'e6c92438-3eab-4ae3-bb8b-fac4616add43',
            value: {
              text: 'A must-buy for gamers.',
              label: 'positive'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '5e6f7a8b-9c0d-4d2e-b3a2-3f5e6f7d8a9b',
            created_at: '2024-10-06T18:20:13Z',
            updated_at: '2024-09-26T05:20:11Z'
          },
          {
            id: '29df90bf-4fbe-480b-8aba-a59c9928846f',
            value: {
              text: 'The quality could be better.',
              label: 'neutral'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '5e6f7a8b-9c0d-4d2e-b3a2-3f5e6f7d8a9b',
            created_at: '2024-10-16T12:19:38Z',
            updated_at: '2024-09-20T00:27:36Z'
          },
          {
            id: '589230f1-7bdc-431b-a939-186193e3250a',
            value: {
              text: 'Exceeded my expectations!',
              label: 'positive'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '5e6f7a8b-9c0d-4d2e-b3a2-3f5e6f7d8a9b',
            created_at: '2024-10-14T16:36:20Z',
            updated_at: '2024-07-13T12:51:18Z'
          }
        ]
      }
    ]
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440000',
    name: 'Image Classification Pipeline',
    metadata: {},
    created_at: '2024-01-10T12:00:00Z',
    updated_at: '2024-02-20T15:30:00Z',
    datasets: [
      {
        id: '3b241101-e2bb-4255-8caf-4136c566a961',
        name: 'ImageNet Preprocessed',
        description: 'Processed ImageNet dataset for classification tasks',
        project_id: '550e8400-e29b-41d4-a716-446655440000',
        is_locked: false,
        metadata: {},
        created_at: '2024-01-15T08:00:00Z',
        updated_at: '2024-02-18T14:45:00Z',
        data: [
          {
            id: 'c9b1d2f0-4c2b-11ee-be56-0242ac120002',
            value: {
              image_path: 's3://bucket/image1.jpg',
              label: 'cat'
            },
            metadata: {
              source: 'ImageNet',
              resolution: '224x224'
            },
            status: 'Pending',
            dataset_id: '3b241101-e2bb-4255-8caf-4136c566a961',
            created_at: '2024-02-10T10:00:00Z',
            updated_at: '2024-02-12T11:00:00Z'
          },
          {
            id: 'c4dbeccd-b549-43f6-b101-811f25a93bf2',
            value: {
              image_path: 's3://bucket/image_ce27349d-238d-4724-8c15-85a1c321774d.jpg',
              label: 'cat'
            },
            metadata: {
              source: 'ImageNet',
              resolution: '224x224'
            },
            status: 'Pending',
            dataset_id: '3b241101-e2bb-4255-8caf-4136c566a961',
            created_at: '2024-05-16T20:16:11Z',
            updated_at: '2024-10-01T08:05:27Z'
          },
          {
            id: '09d2f430-ed5b-4c84-988e-1b8880b9068c',
            value: {
              image_path: 's3://bucket/image_5fcabfeb-a058-4ed1-b372-96a5e967b58b.jpg',
              label: 'dog'
            },
            metadata: {
              source: 'ImageNet',
              resolution: '224x224'
            },
            status: 'Pending',
            dataset_id: '3b241101-e2bb-4255-8caf-4136c566a961',
            created_at: '2024-11-19T07:06:10Z',
            updated_at: '2024-11-13T08:06:52Z'
          },
          {
            id: '3dbaf7bb-8b28-4411-8a86-54381f027408',
            value: {
              image_path: 's3://bucket/image_b0d5f784-43e3-45ae-bb2b-de0d28c6416f.jpg',
              label: 'bird'
            },
            metadata: {
              source: 'ImageNet',
              resolution: '224x224'
            },
            status: 'Process',
            dataset_id: '3b241101-e2bb-4255-8caf-4136c566a961',
            created_at: '2024-12-08T21:10:03Z',
            updated_at: '2024-08-13T20:36:46Z'
          },
          {
            id: '5c55d5bd-0dd5-445f-b1fb-f84df4826a6e',
            value: {
              image_path: 's3://bucket/image_7c5d9b5a-a08a-4a62-9ea4-dc509d4975e3.jpg',
              label: 'car'
            },
            metadata: {
              source: 'ImageNet',
              resolution: '224x224'
            },
            status: 'Process',
            dataset_id: '3b241101-e2bb-4255-8caf-4136c566a961',
            created_at: '2024-08-12T06:47:32Z',
            updated_at: '2024-06-01T20:02:16Z'
          },
          {
            id: '45b7ac95-dda1-4f33-9688-d3b5efe21356',
            value: {
              image_path: 's3://bucket/image_14645b03-3204-40f8-bedb-96396a8905e0.jpg',
              label: 'tree'
            },
            metadata: {
              source: 'ImageNet',
              resolution: '224x224'
            },
            status: 'Process',
            dataset_id: '3b241101-e2bb-4255-8caf-4136c566a961',
            created_at: '2024-08-25T14:23:40Z',
            updated_at: '2024-01-09T02:57:58Z'
          },
          {
            id: '9ca8f735-5783-42e5-81d2-509eff82c07f',
            value: {
              image_path: 's3://bucket/image_2b5c2074-edda-47a3-b0f9-ad5a7577cc3c.jpg',
              label: 'house'
            },
            metadata: {
              source: 'ImageNet',
              resolution: '224x224'
            },
            status: 'Submitted',
            dataset_id: '3b241101-e2bb-4255-8caf-4136c566a961',
            created_at: '2024-04-06T09:05:51Z',
            updated_at: '2024-01-08T17:28:05Z'
          },
          {
            id: '85f2752d-df90-4731-b0d6-6932b5a5b13f',
            value: {
              image_path: 's3://bucket/image_ccd5cb1b-eacd-4284-baea-5c8b34619d0f.jpg',
              label: 'flower'
            },
            metadata: {
              source: 'ImageNet',
              resolution: '224x224'
            },
            status: 'Submitted',
            dataset_id: '3b241101-e2bb-4255-8caf-4136c566a961',
            created_at: '2024-11-30T15:20:05Z',
            updated_at: '2024-02-18T23:41:11Z'
          },
          {
            id: 'ab55f43a-fbbc-4886-9cca-4d9254c5ec45',
            value: {
              image_path: 's3://bucket/image_3ab1080f-8711-4a71-9145-b79923521d89.jpg',
              label: 'person'
            },
            metadata: {
              source: 'ImageNet',
              resolution: '224x224'
            },
            status: 'Process',
            dataset_id: '3b241101-e2bb-4255-8caf-4136c566a961',
            created_at: '2024-12-09T02:13:19Z',
            updated_at: '2024-04-08T13:31:55Z'
          },
          {
            id: '2bd13d9b-f066-451c-9f0e-28958a5e8df5',
            value: {
              image_path: 's3://bucket/image_26eaebf2-2b53-409f-b153-1c17c8b476e6.jpg',
              label: 'food'
            },
            metadata: {
              source: 'ImageNet',
              resolution: '224x224'
            },
            status: 'Pending',
            dataset_id: '3b241101-e2bb-4255-8caf-4136c566a961',
            created_at: '2024-09-25T08:11:46Z',
            updated_at: '2024-06-29T00:05:31Z'
          },
          {
            id: 'e251a069-990e-49f1-9391-085f2cb38362',
            value: {
              image_path: 's3://bucket/image_35d0dbb5-1cf3-48a0-adc3-a5a40b18ad48.jpg',
              label: 'laptop'
            },
            metadata: {
              source: 'ImageNet',
              resolution: '224x224'
            },
            status: 'Pending',
            dataset_id: '3b241101-e2bb-4255-8caf-4136c566a961',
            created_at: '2024-06-13T08:59:39Z',
            updated_at: '2024-12-08T05:25:29Z'
          }
        ]
      }
    ]
  },
  {
    id: 'c8a1cfc0-4c2b-11ee-be56-0242ac120002',
    name: 'NLP Text Classification',
    metadata: {},
    created_at: '2024-02-01T10:00:00Z',
    updated_at: '2024-02-25T16:00:00Z',
    datasets: [
      {
        id: '4a5b6c7d-8e9f-4b0c-b2b1-2e5d8f8f7c6a',
        name: 'Sentiment Analysis Corpus',
        description: 'Labeled dataset for sentiment analysis',
        project_id: 'c8a1cfc0-4c2b-11ee-be56-0242ac120002',
        is_locked: false,
        metadata: {},
        created_at: '2024-02-05T12:00:00Z',
        updated_at: '2024-02-20T14:00:00Z',
        data: [
          {
            id: 'd2a4b5c6-7e8f-490a-92b1-1e3d5c7b6a4f',
            value: {
              text: 'This product is amazing!',
              label: 'positive'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '4a5b6c7d-8e9f-4b0c-b2b1-2e5d8f8f7c6a',
            created_at: '2024-02-10T14:20:00Z',
            updated_at: '2024-02-12T15:30:00Z'
          },
          {
            id: '8791e4b7-63b0-41bf-ab20-8e387654caf2',
            value: {
              text: 'This product is amazing!',
              label: 'positive'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '4a5b6c7d-8e9f-4b0c-b2b1-2e5d8f8f7c6a',
            created_at: '2024-02-27T12:01:05Z',
            updated_at: '2024-11-26T00:07:29Z'
          },
          {
            id: '3903d3c6-b9fd-4cab-9192-af6aa12848cd',
            value: {
              text: 'I had a terrible experience.',
              label: 'negative'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '4a5b6c7d-8e9f-4b0c-b2b1-2e5d8f8f7c6a',
            created_at: '2024-05-05T21:27:44Z',
            updated_at: '2024-07-29T03:51:03Z'
          },
          {
            id: 'd3a2af05-287c-4f05-aab9-c77b3cd31a98',
            value: {
              text: 'The movie was just okay.',
              label: 'neutral'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '4a5b6c7d-8e9f-4b0c-b2b1-2e5d8f8f7c6a',
            created_at: '2024-06-21T08:46:23Z',
            updated_at: '2024-07-03T00:11:40Z'
          },
          {
            id: 'dee3e78d-9c1d-44e7-b838-12c8a11871e6',
            value: {
              text: 'Fantastic service, highly recommend!',
              label: 'positive'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Process',
            dataset_id: '4a5b6c7d-8e9f-4b0c-b2b1-2e5d8f8f7c6a',
            created_at: '2024-04-22T13:51:33Z',
            updated_at: '2024-06-05T06:49:54Z'
          },
          {
            id: '7df7b902-34c0-4c1f-9ace-51f38c5a119f',
            value: {
              text: 'Not worth the money.',
              label: 'negative'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Process',
            dataset_id: '4a5b6c7d-8e9f-4b0c-b2b1-2e5d8f8f7c6a',
            created_at: '2024-01-03T16:46:26Z',
            updated_at: '2024-02-18T19:01:40Z'
          },
          {
            id: 'f09dbf9e-5df5-4d2f-a96c-8e85e57dadc6',
            value: {
              text: 'I love this phone, great battery life!',
              label: 'positive'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '4a5b6c7d-8e9f-4b0c-b2b1-2e5d8f8f7c6a',
            created_at: '2024-06-15T01:27:03Z',
            updated_at: '2024-08-11T11:30:51Z'
          },
          {
            id: 'cb19ba55-265e-4b4c-98c6-ca3e36cdc3d1',
            value: {
              text: 'Customer support was unhelpful.',
              label: 'negative'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '4a5b6c7d-8e9f-4b0c-b2b1-2e5d8f8f7c6a',
            created_at: '2024-12-31T13:11:14Z',
            updated_at: '2024-11-11T00:57:06Z'
          },
          {
            id: '56b241f3-e78d-4383-98ab-74ff90ac7778',
            value: {
              text: 'A must-buy for gamers.',
              label: 'positive'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Pending',
            dataset_id: '4a5b6c7d-8e9f-4b0c-b2b1-2e5d8f8f7c6a',
            created_at: '2024-07-31T03:49:36Z',
            updated_at: '2024-08-13T09:45:28Z'
          },
          {
            id: '56b944eb-6528-49f0-8a1e-26c1044fecef',
            value: {
              text: 'The quality could be better.',
              label: 'neutral'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '4a5b6c7d-8e9f-4b0c-b2b1-2e5d8f8f7c6a',
            created_at: '2024-01-26T08:47:21Z',
            updated_at: '2024-02-26T13:59:24Z'
          },
          {
            id: '470d0b6c-b3bf-4ead-84cc-115d69282461',
            value: {
              text: 'Exceeded my expectations!',
              label: 'positive'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Pending',
            dataset_id: '4a5b6c7d-8e9f-4b0c-b2b1-2e5d8f8f7c6a',
            created_at: '2024-10-25T05:03:19Z',
            updated_at: '2024-07-29T09:00:30Z'
          }
        ]
      },
      {
        id: '5e6f7a8b-9c0d-4d2e-b3a2-3f5e6f7d8a9b',
        name: 'News Classification Dataset',
        description: 'News articles categorized by topic',
        project_id: 'c8a1cfc0-4c2b-11ee-be56-0242ac120002',
        is_locked: false,
        metadata: {},
        created_at: '2024-02-08T11:00:00Z',
        updated_at: '2024-02-22T17:00:00Z',
        data: [
          {
            id: '6f2e3304-6950-474c-b7c4-e190f4ad1a2b',
            value: {
              text: 'This product is amazing!',
              label: 'positive'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '5e6f7a8b-9c0d-4d2e-b3a2-3f5e6f7d8a9b',
            created_at: '2024-04-24T06:54:53Z',
            updated_at: '2024-06-25T17:59:04Z'
          },
          {
            id: '0bc90e91-5c7e-48bf-adb5-e6f530e0b421',
            value: {
              text: 'I had a terrible experience.',
              label: 'negative'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '5e6f7a8b-9c0d-4d2e-b3a2-3f5e6f7d8a9b',
            created_at: '2024-04-18T05:30:12Z',
            updated_at: '2024-10-15T08:07:55Z'
          },
          {
            id: '21c84c90-8693-424e-89d0-23f96f264bae',
            value: {
              text: 'The movie was just okay.',
              label: 'neutral'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '5e6f7a8b-9c0d-4d2e-b3a2-3f5e6f7d8a9b',
            created_at: '2024-09-01T02:15:55Z',
            updated_at: '2024-02-01T02:22:49Z'
          },
          {
            id: '2530e6f6-52b5-4217-80c6-91d0e68565f4',
            value: {
              text: 'Fantastic service, highly recommend!',
              label: 'positive'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '5e6f7a8b-9c0d-4d2e-b3a2-3f5e6f7d8a9b',
            created_at: '2024-07-30T00:42:14Z',
            updated_at: '2024-05-20T17:32:40Z'
          },
          {
            id: '061624db-5e4f-4974-8051-8af2669484ff',
            value: {
              text: 'Not worth the money.',
              label: 'negative'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '5e6f7a8b-9c0d-4d2e-b3a2-3f5e6f7d8a9b',
            created_at: '2024-07-16T15:33:03Z',
            updated_at: '2024-09-04T10:39:15Z'
          },
          {
            id: '27d913b8-6453-4916-a19f-11bd10222add',
            value: {
              text: 'I love this phone, great battery life!',
              label: 'positive'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '5e6f7a8b-9c0d-4d2e-b3a2-3f5e6f7d8a9b',
            created_at: '2024-10-31T12:20:05Z',
            updated_at: '2024-10-14T05:01:10Z'
          },
          {
            id: 'b1a153a5-769a-4520-8cce-d3a516a52f12',
            value: {
              text: 'Customer support was unhelpful.',
              label: 'negative'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '5e6f7a8b-9c0d-4d2e-b3a2-3f5e6f7d8a9b',
            created_at: '2024-06-14T20:48:41Z',
            updated_at: '2024-06-24T22:18:12Z'
          },
          {
            id: 'e6c92438-3eab-4ae3-bb8b-fac4616add43',
            value: {
              text: 'A must-buy for gamers.',
              label: 'positive'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '5e6f7a8b-9c0d-4d2e-b3a2-3f5e6f7d8a9b',
            created_at: '2024-10-06T18:20:13Z',
            updated_at: '2024-09-26T05:20:11Z'
          },
          {
            id: '29df90bf-4fbe-480b-8aba-a59c9928846f',
            value: {
              text: 'The quality could be better.',
              label: 'neutral'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '5e6f7a8b-9c0d-4d2e-b3a2-3f5e6f7d8a9b',
            created_at: '2024-10-16T12:19:38Z',
            updated_at: '2024-09-20T00:27:36Z'
          },
          {
            id: '589230f1-7bdc-431b-a939-186193e3250a',
            value: {
              text: 'Exceeded my expectations!',
              label: 'positive'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '5e6f7a8b-9c0d-4d2e-b3a2-3f5e6f7d8a9b',
            created_at: '2024-10-14T16:36:20Z',
            updated_at: '2024-07-13T12:51:18Z'
          }
        ]
      }
    ]
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440000',
    name: 'Image Classification Pipeline',
    metadata: {},
    created_at: '2024-01-10T12:00:00Z',
    updated_at: '2024-02-20T15:30:00Z',
    datasets: [
      {
        id: '3b241101-e2bb-4255-8caf-4136c566a961',
        name: 'ImageNet Preprocessed',
        description: 'Processed ImageNet dataset for classification tasks',
        project_id: '550e8400-e29b-41d4-a716-446655440000',
        is_locked: false,
        metadata: {},
        created_at: '2024-01-15T08:00:00Z',
        updated_at: '2024-02-18T14:45:00Z',
        data: [
          {
            id: 'c9b1d2f0-4c2b-11ee-be56-0242ac120002',
            value: {
              image_path: 's3://bucket/image1.jpg',
              label: 'cat'
            },
            metadata: {
              source: 'ImageNet',
              resolution: '224x224'
            },
            status: 'Pending',
            dataset_id: '3b241101-e2bb-4255-8caf-4136c566a961',
            created_at: '2024-02-10T10:00:00Z',
            updated_at: '2024-02-12T11:00:00Z'
          },
          {
            id: 'c4dbeccd-b549-43f6-b101-811f25a93bf2',
            value: {
              image_path: 's3://bucket/image_ce27349d-238d-4724-8c15-85a1c321774d.jpg',
              label: 'cat'
            },
            metadata: {
              source: 'ImageNet',
              resolution: '224x224'
            },
            status: 'Pending',
            dataset_id: '3b241101-e2bb-4255-8caf-4136c566a961',
            created_at: '2024-05-16T20:16:11Z',
            updated_at: '2024-10-01T08:05:27Z'
          },
          {
            id: '09d2f430-ed5b-4c84-988e-1b8880b9068c',
            value: {
              image_path: 's3://bucket/image_5fcabfeb-a058-4ed1-b372-96a5e967b58b.jpg',
              label: 'dog'
            },
            metadata: {
              source: 'ImageNet',
              resolution: '224x224'
            },
            status: 'Pending',
            dataset_id: '3b241101-e2bb-4255-8caf-4136c566a961',
            created_at: '2024-11-19T07:06:10Z',
            updated_at: '2024-11-13T08:06:52Z'
          },
          {
            id: '3dbaf7bb-8b28-4411-8a86-54381f027408',
            value: {
              image_path: 's3://bucket/image_b0d5f784-43e3-45ae-bb2b-de0d28c6416f.jpg',
              label: 'bird'
            },
            metadata: {
              source: 'ImageNet',
              resolution: '224x224'
            },
            status: 'Process',
            dataset_id: '3b241101-e2bb-4255-8caf-4136c566a961',
            created_at: '2024-12-08T21:10:03Z',
            updated_at: '2024-08-13T20:36:46Z'
          },
          {
            id: '5c55d5bd-0dd5-445f-b1fb-f84df4826a6e',
            value: {
              image_path: 's3://bucket/image_7c5d9b5a-a08a-4a62-9ea4-dc509d4975e3.jpg',
              label: 'car'
            },
            metadata: {
              source: 'ImageNet',
              resolution: '224x224'
            },
            status: 'Process',
            dataset_id: '3b241101-e2bb-4255-8caf-4136c566a961',
            created_at: '2024-08-12T06:47:32Z',
            updated_at: '2024-06-01T20:02:16Z'
          },
          {
            id: '45b7ac95-dda1-4f33-9688-d3b5efe21356',
            value: {
              image_path: 's3://bucket/image_14645b03-3204-40f8-bedb-96396a8905e0.jpg',
              label: 'tree'
            },
            metadata: {
              source: 'ImageNet',
              resolution: '224x224'
            },
            status: 'Process',
            dataset_id: '3b241101-e2bb-4255-8caf-4136c566a961',
            created_at: '2024-08-25T14:23:40Z',
            updated_at: '2024-01-09T02:57:58Z'
          },
          {
            id: '9ca8f735-5783-42e5-81d2-509eff82c07f',
            value: {
              image_path: 's3://bucket/image_2b5c2074-edda-47a3-b0f9-ad5a7577cc3c.jpg',
              label: 'house'
            },
            metadata: {
              source: 'ImageNet',
              resolution: '224x224'
            },
            status: 'Submitted',
            dataset_id: '3b241101-e2bb-4255-8caf-4136c566a961',
            created_at: '2024-04-06T09:05:51Z',
            updated_at: '2024-01-08T17:28:05Z'
          },
          {
            id: '85f2752d-df90-4731-b0d6-6932b5a5b13f',
            value: {
              image_path: 's3://bucket/image_ccd5cb1b-eacd-4284-baea-5c8b34619d0f.jpg',
              label: 'flower'
            },
            metadata: {
              source: 'ImageNet',
              resolution: '224x224'
            },
            status: 'Submitted',
            dataset_id: '3b241101-e2bb-4255-8caf-4136c566a961',
            created_at: '2024-11-30T15:20:05Z',
            updated_at: '2024-02-18T23:41:11Z'
          },
          {
            id: 'ab55f43a-fbbc-4886-9cca-4d9254c5ec45',
            value: {
              image_path: 's3://bucket/image_3ab1080f-8711-4a71-9145-b79923521d89.jpg',
              label: 'person'
            },
            metadata: {
              source: 'ImageNet',
              resolution: '224x224'
            },
            status: 'Process',
            dataset_id: '3b241101-e2bb-4255-8caf-4136c566a961',
            created_at: '2024-12-09T02:13:19Z',
            updated_at: '2024-04-08T13:31:55Z'
          },
          {
            id: '2bd13d9b-f066-451c-9f0e-28958a5e8df5',
            value: {
              image_path: 's3://bucket/image_26eaebf2-2b53-409f-b153-1c17c8b476e6.jpg',
              label: 'food'
            },
            metadata: {
              source: 'ImageNet',
              resolution: '224x224'
            },
            status: 'Pending',
            dataset_id: '3b241101-e2bb-4255-8caf-4136c566a961',
            created_at: '2024-09-25T08:11:46Z',
            updated_at: '2024-06-29T00:05:31Z'
          },
          {
            id: 'e251a069-990e-49f1-9391-085f2cb38362',
            value: {
              image_path: 's3://bucket/image_35d0dbb5-1cf3-48a0-adc3-a5a40b18ad48.jpg',
              label: 'laptop'
            },
            metadata: {
              source: 'ImageNet',
              resolution: '224x224'
            },
            status: 'Pending',
            dataset_id: '3b241101-e2bb-4255-8caf-4136c566a961',
            created_at: '2024-06-13T08:59:39Z',
            updated_at: '2024-12-08T05:25:29Z'
          }
        ]
      }
    ]
  },
  {
    id: 'c8a1cfc0-4c2b-11ee-be56-0242ac120002',
    name: 'NLP Text Classification',
    metadata: {},
    created_at: '2024-02-01T10:00:00Z',
    updated_at: '2024-02-25T16:00:00Z',
    datasets: [
      {
        id: '4a5b6c7d-8e9f-4b0c-b2b1-2e5d8f8f7c6a',
        name: 'Sentiment Analysis Corpus',
        description: 'Labeled dataset for sentiment analysis',
        project_id: 'c8a1cfc0-4c2b-11ee-be56-0242ac120002',
        is_locked: false,
        metadata: {},
        created_at: '2024-02-05T12:00:00Z',
        updated_at: '2024-02-20T14:00:00Z',
        data: [
          {
            id: 'd2a4b5c6-7e8f-490a-92b1-1e3d5c7b6a4f',
            value: {
              text: 'This product is amazing!',
              label: 'positive'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '4a5b6c7d-8e9f-4b0c-b2b1-2e5d8f8f7c6a',
            created_at: '2024-02-10T14:20:00Z',
            updated_at: '2024-02-12T15:30:00Z'
          },
          {
            id: '8791e4b7-63b0-41bf-ab20-8e387654caf2',
            value: {
              text: 'This product is amazing!',
              label: 'positive'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '4a5b6c7d-8e9f-4b0c-b2b1-2e5d8f8f7c6a',
            created_at: '2024-02-27T12:01:05Z',
            updated_at: '2024-11-26T00:07:29Z'
          },
          {
            id: '3903d3c6-b9fd-4cab-9192-af6aa12848cd',
            value: {
              text: 'I had a terrible experience.',
              label: 'negative'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '4a5b6c7d-8e9f-4b0c-b2b1-2e5d8f8f7c6a',
            created_at: '2024-05-05T21:27:44Z',
            updated_at: '2024-07-29T03:51:03Z'
          },
          {
            id: 'd3a2af05-287c-4f05-aab9-c77b3cd31a98',
            value: {
              text: 'The movie was just okay.',
              label: 'neutral'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '4a5b6c7d-8e9f-4b0c-b2b1-2e5d8f8f7c6a',
            created_at: '2024-06-21T08:46:23Z',
            updated_at: '2024-07-03T00:11:40Z'
          },
          {
            id: 'dee3e78d-9c1d-44e7-b838-12c8a11871e6',
            value: {
              text: 'Fantastic service, highly recommend!',
              label: 'positive'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Process',
            dataset_id: '4a5b6c7d-8e9f-4b0c-b2b1-2e5d8f8f7c6a',
            created_at: '2024-04-22T13:51:33Z',
            updated_at: '2024-06-05T06:49:54Z'
          },
          {
            id: '7df7b902-34c0-4c1f-9ace-51f38c5a119f',
            value: {
              text: 'Not worth the money.',
              label: 'negative'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Process',
            dataset_id: '4a5b6c7d-8e9f-4b0c-b2b1-2e5d8f8f7c6a',
            created_at: '2024-01-03T16:46:26Z',
            updated_at: '2024-02-18T19:01:40Z'
          },
          {
            id: 'f09dbf9e-5df5-4d2f-a96c-8e85e57dadc6',
            value: {
              text: 'I love this phone, great battery life!',
              label: 'positive'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '4a5b6c7d-8e9f-4b0c-b2b1-2e5d8f8f7c6a',
            created_at: '2024-06-15T01:27:03Z',
            updated_at: '2024-08-11T11:30:51Z'
          },
          {
            id: 'cb19ba55-265e-4b4c-98c6-ca3e36cdc3d1',
            value: {
              text: 'Customer support was unhelpful.',
              label: 'negative'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '4a5b6c7d-8e9f-4b0c-b2b1-2e5d8f8f7c6a',
            created_at: '2024-12-31T13:11:14Z',
            updated_at: '2024-11-11T00:57:06Z'
          },
          {
            id: '56b241f3-e78d-4383-98ab-74ff90ac7778',
            value: {
              text: 'A must-buy for gamers.',
              label: 'positive'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Pending',
            dataset_id: '4a5b6c7d-8e9f-4b0c-b2b1-2e5d8f8f7c6a',
            created_at: '2024-07-31T03:49:36Z',
            updated_at: '2024-08-13T09:45:28Z'
          },
          {
            id: '56b944eb-6528-49f0-8a1e-26c1044fecef',
            value: {
              text: 'The quality could be better.',
              label: 'neutral'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '4a5b6c7d-8e9f-4b0c-b2b1-2e5d8f8f7c6a',
            created_at: '2024-01-26T08:47:21Z',
            updated_at: '2024-02-26T13:59:24Z'
          },
          {
            id: '470d0b6c-b3bf-4ead-84cc-115d69282461',
            value: {
              text: 'Exceeded my expectations!',
              label: 'positive'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Pending',
            dataset_id: '4a5b6c7d-8e9f-4b0c-b2b1-2e5d8f8f7c6a',
            created_at: '2024-10-25T05:03:19Z',
            updated_at: '2024-07-29T09:00:30Z'
          }
        ]
      },
      {
        id: '5e6f7a8b-9c0d-4d2e-b3a2-3f5e6f7d8a9b',
        name: 'News Classification Dataset',
        description: 'News articles categorized by topic',
        project_id: 'c8a1cfc0-4c2b-11ee-be56-0242ac120002',
        is_locked: false,
        metadata: {},
        created_at: '2024-02-08T11:00:00Z',
        updated_at: '2024-02-22T17:00:00Z',
        data: [
          {
            id: '6f2e3304-6950-474c-b7c4-e190f4ad1a2b',
            value: {
              text: 'This product is amazing!',
              label: 'positive'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '5e6f7a8b-9c0d-4d2e-b3a2-3f5e6f7d8a9b',
            created_at: '2024-04-24T06:54:53Z',
            updated_at: '2024-06-25T17:59:04Z'
          },
          {
            id: '0bc90e91-5c7e-48bf-adb5-e6f530e0b421',
            value: {
              text: 'I had a terrible experience.',
              label: 'negative'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '5e6f7a8b-9c0d-4d2e-b3a2-3f5e6f7d8a9b',
            created_at: '2024-04-18T05:30:12Z',
            updated_at: '2024-10-15T08:07:55Z'
          },
          {
            id: '21c84c90-8693-424e-89d0-23f96f264bae',
            value: {
              text: 'The movie was just okay.',
              label: 'neutral'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '5e6f7a8b-9c0d-4d2e-b3a2-3f5e6f7d8a9b',
            created_at: '2024-09-01T02:15:55Z',
            updated_at: '2024-02-01T02:22:49Z'
          },
          {
            id: '2530e6f6-52b5-4217-80c6-91d0e68565f4',
            value: {
              text: 'Fantastic service, highly recommend!',
              label: 'positive'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '5e6f7a8b-9c0d-4d2e-b3a2-3f5e6f7d8a9b',
            created_at: '2024-07-30T00:42:14Z',
            updated_at: '2024-05-20T17:32:40Z'
          },
          {
            id: '061624db-5e4f-4974-8051-8af2669484ff',
            value: {
              text: 'Not worth the money.',
              label: 'negative'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '5e6f7a8b-9c0d-4d2e-b3a2-3f5e6f7d8a9b',
            created_at: '2024-07-16T15:33:03Z',
            updated_at: '2024-09-04T10:39:15Z'
          },
          {
            id: '27d913b8-6453-4916-a19f-11bd10222add',
            value: {
              text: 'I love this phone, great battery life!',
              label: 'positive'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '5e6f7a8b-9c0d-4d2e-b3a2-3f5e6f7d8a9b',
            created_at: '2024-10-31T12:20:05Z',
            updated_at: '2024-10-14T05:01:10Z'
          },
          {
            id: 'b1a153a5-769a-4520-8cce-d3a516a52f12',
            value: {
              text: 'Customer support was unhelpful.',
              label: 'negative'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '5e6f7a8b-9c0d-4d2e-b3a2-3f5e6f7d8a9b',
            created_at: '2024-06-14T20:48:41Z',
            updated_at: '2024-06-24T22:18:12Z'
          },
          {
            id: 'e6c92438-3eab-4ae3-bb8b-fac4616add43',
            value: {
              text: 'A must-buy for gamers.',
              label: 'positive'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '5e6f7a8b-9c0d-4d2e-b3a2-3f5e6f7d8a9b',
            created_at: '2024-10-06T18:20:13Z',
            updated_at: '2024-09-26T05:20:11Z'
          },
          {
            id: '29df90bf-4fbe-480b-8aba-a59c9928846f',
            value: {
              text: 'The quality could be better.',
              label: 'neutral'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '5e6f7a8b-9c0d-4d2e-b3a2-3f5e6f7d8a9b',
            created_at: '2024-10-16T12:19:38Z',
            updated_at: '2024-09-20T00:27:36Z'
          },
          {
            id: '589230f1-7bdc-431b-a939-186193e3250a',
            value: {
              text: 'Exceeded my expectations!',
              label: 'positive'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '5e6f7a8b-9c0d-4d2e-b3a2-3f5e6f7d8a9b',
            created_at: '2024-10-14T16:36:20Z',
            updated_at: '2024-07-13T12:51:18Z'
          }
        ]
      }
    ]
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440000',
    name: 'Image Classification Pipeline',
    metadata: {},
    created_at: '2024-01-10T12:00:00Z',
    updated_at: '2024-02-20T15:30:00Z',
    datasets: [
      {
        id: '3b241101-e2bb-4255-8caf-4136c566a961',
        name: 'ImageNet Preprocessed',
        description: 'Processed ImageNet dataset for classification tasks',
        project_id: '550e8400-e29b-41d4-a716-446655440000',
        is_locked: false,
        metadata: {},
        created_at: '2024-01-15T08:00:00Z',
        updated_at: '2024-02-18T14:45:00Z',
        data: [
          {
            id: 'c9b1d2f0-4c2b-11ee-be56-0242ac120002',
            value: {
              image_path: 's3://bucket/image1.jpg',
              label: 'cat'
            },
            metadata: {
              source: 'ImageNet',
              resolution: '224x224'
            },
            status: 'Pending',
            dataset_id: '3b241101-e2bb-4255-8caf-4136c566a961',
            created_at: '2024-02-10T10:00:00Z',
            updated_at: '2024-02-12T11:00:00Z'
          },
          {
            id: 'c4dbeccd-b549-43f6-b101-811f25a93bf2',
            value: {
              image_path: 's3://bucket/image_ce27349d-238d-4724-8c15-85a1c321774d.jpg',
              label: 'cat'
            },
            metadata: {
              source: 'ImageNet',
              resolution: '224x224'
            },
            status: 'Pending',
            dataset_id: '3b241101-e2bb-4255-8caf-4136c566a961',
            created_at: '2024-05-16T20:16:11Z',
            updated_at: '2024-10-01T08:05:27Z'
          },
          {
            id: '09d2f430-ed5b-4c84-988e-1b8880b9068c',
            value: {
              image_path: 's3://bucket/image_5fcabfeb-a058-4ed1-b372-96a5e967b58b.jpg',
              label: 'dog'
            },
            metadata: {
              source: 'ImageNet',
              resolution: '224x224'
            },
            status: 'Pending',
            dataset_id: '3b241101-e2bb-4255-8caf-4136c566a961',
            created_at: '2024-11-19T07:06:10Z',
            updated_at: '2024-11-13T08:06:52Z'
          },
          {
            id: '3dbaf7bb-8b28-4411-8a86-54381f027408',
            value: {
              image_path: 's3://bucket/image_b0d5f784-43e3-45ae-bb2b-de0d28c6416f.jpg',
              label: 'bird'
            },
            metadata: {
              source: 'ImageNet',
              resolution: '224x224'
            },
            status: 'Process',
            dataset_id: '3b241101-e2bb-4255-8caf-4136c566a961',
            created_at: '2024-12-08T21:10:03Z',
            updated_at: '2024-08-13T20:36:46Z'
          },
          {
            id: '5c55d5bd-0dd5-445f-b1fb-f84df4826a6e',
            value: {
              image_path: 's3://bucket/image_7c5d9b5a-a08a-4a62-9ea4-dc509d4975e3.jpg',
              label: 'car'
            },
            metadata: {
              source: 'ImageNet',
              resolution: '224x224'
            },
            status: 'Process',
            dataset_id: '3b241101-e2bb-4255-8caf-4136c566a961',
            created_at: '2024-08-12T06:47:32Z',
            updated_at: '2024-06-01T20:02:16Z'
          },
          {
            id: '45b7ac95-dda1-4f33-9688-d3b5efe21356',
            value: {
              image_path: 's3://bucket/image_14645b03-3204-40f8-bedb-96396a8905e0.jpg',
              label: 'tree'
            },
            metadata: {
              source: 'ImageNet',
              resolution: '224x224'
            },
            status: 'Process',
            dataset_id: '3b241101-e2bb-4255-8caf-4136c566a961',
            created_at: '2024-08-25T14:23:40Z',
            updated_at: '2024-01-09T02:57:58Z'
          },
          {
            id: '9ca8f735-5783-42e5-81d2-509eff82c07f',
            value: {
              image_path: 's3://bucket/image_2b5c2074-edda-47a3-b0f9-ad5a7577cc3c.jpg',
              label: 'house'
            },
            metadata: {
              source: 'ImageNet',
              resolution: '224x224'
            },
            status: 'Submitted',
            dataset_id: '3b241101-e2bb-4255-8caf-4136c566a961',
            created_at: '2024-04-06T09:05:51Z',
            updated_at: '2024-01-08T17:28:05Z'
          },
          {
            id: '85f2752d-df90-4731-b0d6-6932b5a5b13f',
            value: {
              image_path: 's3://bucket/image_ccd5cb1b-eacd-4284-baea-5c8b34619d0f.jpg',
              label: 'flower'
            },
            metadata: {
              source: 'ImageNet',
              resolution: '224x224'
            },
            status: 'Submitted',
            dataset_id: '3b241101-e2bb-4255-8caf-4136c566a961',
            created_at: '2024-11-30T15:20:05Z',
            updated_at: '2024-02-18T23:41:11Z'
          },
          {
            id: 'ab55f43a-fbbc-4886-9cca-4d9254c5ec45',
            value: {
              image_path: 's3://bucket/image_3ab1080f-8711-4a71-9145-b79923521d89.jpg',
              label: 'person'
            },
            metadata: {
              source: 'ImageNet',
              resolution: '224x224'
            },
            status: 'Process',
            dataset_id: '3b241101-e2bb-4255-8caf-4136c566a961',
            created_at: '2024-12-09T02:13:19Z',
            updated_at: '2024-04-08T13:31:55Z'
          },
          {
            id: '2bd13d9b-f066-451c-9f0e-28958a5e8df5',
            value: {
              image_path: 's3://bucket/image_26eaebf2-2b53-409f-b153-1c17c8b476e6.jpg',
              label: 'food'
            },
            metadata: {
              source: 'ImageNet',
              resolution: '224x224'
            },
            status: 'Pending',
            dataset_id: '3b241101-e2bb-4255-8caf-4136c566a961',
            created_at: '2024-09-25T08:11:46Z',
            updated_at: '2024-06-29T00:05:31Z'
          },
          {
            id: 'e251a069-990e-49f1-9391-085f2cb38362',
            value: {
              image_path: 's3://bucket/image_35d0dbb5-1cf3-48a0-adc3-a5a40b18ad48.jpg',
              label: 'laptop'
            },
            metadata: {
              source: 'ImageNet',
              resolution: '224x224'
            },
            status: 'Pending',
            dataset_id: '3b241101-e2bb-4255-8caf-4136c566a961',
            created_at: '2024-06-13T08:59:39Z',
            updated_at: '2024-12-08T05:25:29Z'
          }
        ]
      }
    ]
  },
  {
    id: 'c8a1cfc0-4c2b-11ee-be56-0242ac120002',
    name: 'NLP Text Classification',
    metadata: {},
    created_at: '2024-02-01T10:00:00Z',
    updated_at: '2024-02-25T16:00:00Z',
    datasets: [
      {
        id: '4a5b6c7d-8e9f-4b0c-b2b1-2e5d8f8f7c6a',
        name: 'Sentiment Analysis Corpus',
        description: 'Labeled dataset for sentiment analysis',
        project_id: 'c8a1cfc0-4c2b-11ee-be56-0242ac120002',
        is_locked: false,
        metadata: {},
        created_at: '2024-02-05T12:00:00Z',
        updated_at: '2024-02-20T14:00:00Z',
        data: [
          {
            id: 'd2a4b5c6-7e8f-490a-92b1-1e3d5c7b6a4f',
            value: {
              text: 'This product is amazing!',
              label: 'positive'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '4a5b6c7d-8e9f-4b0c-b2b1-2e5d8f8f7c6a',
            created_at: '2024-02-10T14:20:00Z',
            updated_at: '2024-02-12T15:30:00Z'
          },
          {
            id: '8791e4b7-63b0-41bf-ab20-8e387654caf2',
            value: {
              text: 'This product is amazing!',
              label: 'positive'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '4a5b6c7d-8e9f-4b0c-b2b1-2e5d8f8f7c6a',
            created_at: '2024-02-27T12:01:05Z',
            updated_at: '2024-11-26T00:07:29Z'
          },
          {
            id: '3903d3c6-b9fd-4cab-9192-af6aa12848cd',
            value: {
              text: 'I had a terrible experience.',
              label: 'negative'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '4a5b6c7d-8e9f-4b0c-b2b1-2e5d8f8f7c6a',
            created_at: '2024-05-05T21:27:44Z',
            updated_at: '2024-07-29T03:51:03Z'
          },
          {
            id: 'd3a2af05-287c-4f05-aab9-c77b3cd31a98',
            value: {
              text: 'The movie was just okay.',
              label: 'neutral'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '4a5b6c7d-8e9f-4b0c-b2b1-2e5d8f8f7c6a',
            created_at: '2024-06-21T08:46:23Z',
            updated_at: '2024-07-03T00:11:40Z'
          },
          {
            id: 'dee3e78d-9c1d-44e7-b838-12c8a11871e6',
            value: {
              text: 'Fantastic service, highly recommend!',
              label: 'positive'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Process',
            dataset_id: '4a5b6c7d-8e9f-4b0c-b2b1-2e5d8f8f7c6a',
            created_at: '2024-04-22T13:51:33Z',
            updated_at: '2024-06-05T06:49:54Z'
          },
          {
            id: '7df7b902-34c0-4c1f-9ace-51f38c5a119f',
            value: {
              text: 'Not worth the money.',
              label: 'negative'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Process',
            dataset_id: '4a5b6c7d-8e9f-4b0c-b2b1-2e5d8f8f7c6a',
            created_at: '2024-01-03T16:46:26Z',
            updated_at: '2024-02-18T19:01:40Z'
          },
          {
            id: 'f09dbf9e-5df5-4d2f-a96c-8e85e57dadc6',
            value: {
              text: 'I love this phone, great battery life!',
              label: 'positive'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '4a5b6c7d-8e9f-4b0c-b2b1-2e5d8f8f7c6a',
            created_at: '2024-06-15T01:27:03Z',
            updated_at: '2024-08-11T11:30:51Z'
          },
          {
            id: 'cb19ba55-265e-4b4c-98c6-ca3e36cdc3d1',
            value: {
              text: 'Customer support was unhelpful.',
              label: 'negative'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '4a5b6c7d-8e9f-4b0c-b2b1-2e5d8f8f7c6a',
            created_at: '2024-12-31T13:11:14Z',
            updated_at: '2024-11-11T00:57:06Z'
          },
          {
            id: '56b241f3-e78d-4383-98ab-74ff90ac7778',
            value: {
              text: 'A must-buy for gamers.',
              label: 'positive'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Pending',
            dataset_id: '4a5b6c7d-8e9f-4b0c-b2b1-2e5d8f8f7c6a',
            created_at: '2024-07-31T03:49:36Z',
            updated_at: '2024-08-13T09:45:28Z'
          },
          {
            id: '56b944eb-6528-49f0-8a1e-26c1044fecef',
            value: {
              text: 'The quality could be better.',
              label: 'neutral'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '4a5b6c7d-8e9f-4b0c-b2b1-2e5d8f8f7c6a',
            created_at: '2024-01-26T08:47:21Z',
            updated_at: '2024-02-26T13:59:24Z'
          },
          {
            id: '470d0b6c-b3bf-4ead-84cc-115d69282461',
            value: {
              text: 'Exceeded my expectations!',
              label: 'positive'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Pending',
            dataset_id: '4a5b6c7d-8e9f-4b0c-b2b1-2e5d8f8f7c6a',
            created_at: '2024-10-25T05:03:19Z',
            updated_at: '2024-07-29T09:00:30Z'
          }
        ]
      },
      {
        id: '5e6f7a8b-9c0d-4d2e-b3a2-3f5e6f7d8a9b',
        name: 'News Classification Dataset',
        description: 'News articles categorized by topic',
        project_id: 'c8a1cfc0-4c2b-11ee-be56-0242ac120002',
        is_locked: false,
        metadata: {},
        created_at: '2024-02-08T11:00:00Z',
        updated_at: '2024-02-22T17:00:00Z',
        data: [
          {
            id: '6f2e3304-6950-474c-b7c4-e190f4ad1a2b',
            value: {
              text: 'This product is amazing!',
              label: 'positive'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '5e6f7a8b-9c0d-4d2e-b3a2-3f5e6f7d8a9b',
            created_at: '2024-04-24T06:54:53Z',
            updated_at: '2024-06-25T17:59:04Z'
          },
          {
            id: '0bc90e91-5c7e-48bf-adb5-e6f530e0b421',
            value: {
              text: 'I had a terrible experience.',
              label: 'negative'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '5e6f7a8b-9c0d-4d2e-b3a2-3f5e6f7d8a9b',
            created_at: '2024-04-18T05:30:12Z',
            updated_at: '2024-10-15T08:07:55Z'
          },
          {
            id: '21c84c90-8693-424e-89d0-23f96f264bae',
            value: {
              text: 'The movie was just okay.',
              label: 'neutral'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '5e6f7a8b-9c0d-4d2e-b3a2-3f5e6f7d8a9b',
            created_at: '2024-09-01T02:15:55Z',
            updated_at: '2024-02-01T02:22:49Z'
          },
          {
            id: '2530e6f6-52b5-4217-80c6-91d0e68565f4',
            value: {
              text: 'Fantastic service, highly recommend!',
              label: 'positive'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '5e6f7a8b-9c0d-4d2e-b3a2-3f5e6f7d8a9b',
            created_at: '2024-07-30T00:42:14Z',
            updated_at: '2024-05-20T17:32:40Z'
          },
          {
            id: '061624db-5e4f-4974-8051-8af2669484ff',
            value: {
              text: 'Not worth the money.',
              label: 'negative'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '5e6f7a8b-9c0d-4d2e-b3a2-3f5e6f7d8a9b',
            created_at: '2024-07-16T15:33:03Z',
            updated_at: '2024-09-04T10:39:15Z'
          },
          {
            id: '27d913b8-6453-4916-a19f-11bd10222add',
            value: {
              text: 'I love this phone, great battery life!',
              label: 'positive'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '5e6f7a8b-9c0d-4d2e-b3a2-3f5e6f7d8a9b',
            created_at: '2024-10-31T12:20:05Z',
            updated_at: '2024-10-14T05:01:10Z'
          },
          {
            id: 'b1a153a5-769a-4520-8cce-d3a516a52f12',
            value: {
              text: 'Customer support was unhelpful.',
              label: 'negative'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '5e6f7a8b-9c0d-4d2e-b3a2-3f5e6f7d8a9b',
            created_at: '2024-06-14T20:48:41Z',
            updated_at: '2024-06-24T22:18:12Z'
          },
          {
            id: 'e6c92438-3eab-4ae3-bb8b-fac4616add43',
            value: {
              text: 'A must-buy for gamers.',
              label: 'positive'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '5e6f7a8b-9c0d-4d2e-b3a2-3f5e6f7d8a9b',
            created_at: '2024-10-06T18:20:13Z',
            updated_at: '2024-09-26T05:20:11Z'
          },
          {
            id: '29df90bf-4fbe-480b-8aba-a59c9928846f',
            value: {
              text: 'The quality could be better.',
              label: 'neutral'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '5e6f7a8b-9c0d-4d2e-b3a2-3f5e6f7d8a9b',
            created_at: '2024-10-16T12:19:38Z',
            updated_at: '2024-09-20T00:27:36Z'
          },
          {
            id: '589230f1-7bdc-431b-a939-186193e3250a',
            value: {
              text: 'Exceeded my expectations!',
              label: 'positive'
            },
            metadata: {
              source: 'Twitter',
              language: 'en'
            },
            status: 'Submitted',
            dataset_id: '5e6f7a8b-9c0d-4d2e-b3a2-3f5e6f7d8a9b',
            created_at: '2024-10-14T16:36:20Z',
            updated_at: '2024-07-13T12:51:18Z'
          }
        ]
      }
    ]
  }
]

const ProjectList = ({}) => {
  const { t } = useTranslation()
  const ref = useRef<HTMLDivElement>(null)

  // const { mutateAsync: completeOnboarding } = useCompleteOnboarding()

  const { isHR, isCanSeeOnboarding, user } = useCurrentUser()

  const [dataState, setDataState] = useState([])

  const [searchValue, setSearchValue] = useState('')

  const navigate = useNavigate()

  const [text, setText] = useState('')

  const [dates, setDates] = useState({
    startDate: new Date(new Date().setDate(new Date().getDate() - 30)),
    endDate: new Date()
  })

  const debouncedSearch = debounce((e) => {
    setSearchValue(e)
  }, 1000) // 1000ms debounce

  useEffect(() => {
    if (dataProject) {
      setDataState(dataProject)
    }

    return () => {}
  }, [])

  const onClickToday = () => {
    setDates({
      startDate: new Date(),
      endDate: new Date()
    })
  }
  useEffect(() => {
    debouncedSearch(text)

    // Clean-up function to cancel debounced function on component unmount
    return () => {
      debouncedSearch.cancel()
    }
  }, [debouncedSearch, text])

  const estimateSize = 58
  const viewportHeight = document.documentElement.clientHeight
  //  66 + 56 + 56 + 16 + 16 + 64
  const limit = 10000 //|| Math.ceil((viewportHeight - (66 + 56 + 48 + 16 + 16 + 64)) / estimateSize) + 1

  const data = null
  const isFetching = false
  const isLoading = false
  const isRefetching = false

  // const { data, isFetching, fetchNextPage, isLoading, isRefetching, refetch } = useEmployeeList({
  //   limit: limit,
  //   search: searchValue.trim(),
  //   // sortBy: sortBy.find((item) => item.isActive)?.field,
  //   // orderBy: !sortBy.find((item) => item.isActive)?.desc ? 'asc' : 'desc',
  //   disabled: !isCanSeeOnboarding
  // })

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'id',
        header: t('Project ID'),
        // size: 240,
        flex: 1.2,
        enableSorting: false,
        cell: ({ row }) => {
          return (
            <Typography variants='body' size='medium' className='text-gray-800'>
              {row?.original?.id}
            </Typography>
          )
        }
      },
      {
        accessorKey: 'name',
        header: t('Project Name'),
        // size: 180,
        cell: ({ row }) => {
          return (
            <div className='flex gap-1'>
              <Typography title={row?.original?.name} variants='body' size='medium' className='text-gray-800 truncate'>
                {row?.original?.name}
              </Typography>

              <ReactTooltip
                id={row?.original?.name}
                place='right'
                content={row?.original?.name}
                className='bg-gray-800 font-light'
              />
            </div>
          )
        },
        flex: 1.2,
        enableSorting: false
      },
      {
        accessorKey: 'created_at',
        header: t('Created Date'),
        // size: 200,
        flex: 0.6,
        cell: ({ row }) => {
          return (
            <Typography variants='body' size='medium' className='text-gray-800'>
              {fDate(row?.original?.created_at)}
            </Typography>
          )
        },
        enableSorting: false
      },
      {
        accessorKey: 'datasets',
        header: t('Total Datasets'),
        // size: 180,
        flex: 0.8,
        // cell: ({}) => (
        //   <div className='flex items-center justify-center h-full gap-2'>
        //     <span className='text-[11px] text-gray-600 leading-[16px] font-normal mt-1'>
        //       {0}/{12}
        //     </span>
        //     <ProcessComplete />
        //   </div>
        // ),
        cell: ({ row }) => {
          return (
            <Typography variants='body' size='medium' className='text-gray-800'>
              {row?.original?.datasets?.length}
            </Typography>
          )
        },
        enableSorting: false
      }
    ],
    [searchValue, isHR, t]
  )

  const flatData = dataState

  const renderContent = () => {
    if (!flatData?.length && searchValue) {
      return (
        <NoProject
          type='search'
          emptyText={t('noEmployeesMatchYourSearch')}
          className='h-[300px] mt-[174px]'
          isLoading={isFetching || isLoading}
        />
      )
    }

    if (!flatData?.length && !searchValue && !isLoading && !isRefetching) {
      return <NoProject type='noEmployee' emptyText={t('noEmployeeOnboard')} className='h-[300px] mt-[174px]' />
    }

    return (
      <div className='px-smallNudge py-[12px] w-full'>
        <TableVirtualizer
          columns={columns}
          data={flatData?.map((item) => ({
            ...item,
            fullName: getFullName(item.firstName, item.middleName, item.lastName)
          }))}
          height={viewportHeight - 316}
          estimateSize={estimateSize}
          onRowClick={(row) => {
            const employeeId = row?.departments?.[0]?.employeeId
            if (!employeeId) {
              return null
            }
            navigate(`/employee-management/on-boarding/employee/checklist/${employeeId}`) // need to pass employeeId to view checklist of one employee
            return
          }}
          isLoadMore={isFetching}
          isLoading={isRefetching}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        />
      </div>
    )
  }

  return (
    <div className='w-full flex justify-center flex-col items-center'>
      {
        <div ref={ref} className='h-[86px] w-[100%] flex justify-between items-center bg-white  px-4 space-x-4'>
          <div className='w-[320px] '>
            <TextField
              onChange={(e) => setText(e.target.value)}
              label={''}
              value={text}
              placeholder={t('Search by Project Name or ID')}
              endIcon={
                text && (
                  <div className='cursor-pointer' onClick={() => setText('')}>
                    <CloseIcon className='fill-gray-600 mr-2 font-bold' width={24} height={24} />
                  </div>
                )
              }
              startIcon={<SearchIcon className='fill-gray-600' width={24} height={24} />}
            />
          </div>
          <div className='flex items-center gap-2'>
            <Typography variants='body' className='font-medium min-w-[100px]' size='small'>
              Created Date
            </Typography>
            <div className='flex relative gap-3 flex-col lg:flex-row w-full'>
              <div className={'!w-full min-w-[242px]'}>
                <DatePickerV2
                  error={new Date(dates.startDate) > new Date(dates.endDate)}
                  val={dates.startDate}
                  onChange={(value) => setDates((prev) => ({ ...prev, startDate: value }))}
                  zIndex='z-10'
                  disabled={false}
                  helperText={'Invalid Date'}
                  classNameForCalendar='w-full'
                />
              </div>
              <div className={'!w-full min-w-[242px]'}>
                <DatePickerV2
                  error={new Date(dates.startDate) > new Date(dates.endDate)}
                  val={dates.endDate}
                  onChange={(value) => setDates((prev) => ({ ...prev, endDate: value }))}
                  zIndex='z-10'
                  disabled={false}
                  helperText={'Invalid Date'}
                  classNameForCalendar='w-full'
                />
              </div>
            </div>
          </div>
        </div>
      }
      {Number(dataState?.length) > 0 ? (
        <div className='flex justify-start w-full p-4 pb-0 typography-body-md text-gray-800'>
          {t('Projects', { count: 2 })} <span className='ml-1'>({dataState?.length})</span>
        </div>
      ) : null}
      {renderContent()}

      <ReactTooltip
        // clickable
        // openOnClick
        role='dialog'
        id='showPending'
        place='bottom'
        opacity={1}
        className='
          !bg-black-800 font-light !text-white shadow-2xl !rounded-lg max-w-[400px]'
      />
    </div>
  )
}

export default ProjectList
