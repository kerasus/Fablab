import { Collection, Model } from 'js-abstract-model'
import { CelebrityList } from 'src/models/Celebrity.js'
import { MediaHashtag } from 'src/models/MediaHashtag.js'
import { MediaCategory } from 'src/models/MediaCategory.js'

class Media extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'title' },
      { key: 'type' }, //
      { key: 'type_info' }, // VIDEO - TEXT - SOUND
      { key: 'url' },
      { key: 'iframe_code' },
      { key: 'script_code' },
      { key: 'is_live_streaming' },
      { key: 'category' },
      {
        key: 'category_info',
        relatedModel: MediaCategory
      },
      {
        key: 'celebrities',
        relatedModel: CelebrityList
      },
      { key: 'hashtags' },
      {
        key: 'hashtags_info',
        relatedModel: MediaHashtag
      },
      { key: 'creation_time' },
      { key: 'last_modification_time' }
    ])

    this.typeEnums = [
      {
        label: 'ویدیو',
        value: 'VIDEO'
      },
      {
        label: 'متن',
        value: 'TEXT'
      },
      {
        label: 'صوت',
        value: 'SOUND'
      }
    ]

    this.loadTypeInfo()
  }

  loadTypeInfo () {
    const target = this.typeEnums.find(type => type.value === this.type)
    if (!target) {
      this.type_info = null
    } else {
      this.type_info = target
    }
  }
}

class MediaList extends Collection {
  model () {
    return Media
  }
}

export { Media, MediaList }
