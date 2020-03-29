"""Seed file to make sample data for blogly_db"""

from models import Playlist, Song, PlaylistSong, db
from app import app

# Create all tables
db.drop_all()
db.create_all()

# If tables aren't empty, empty them
Playlist.query.delete()
Song.query.delete()
PlaylistSong.query.delete()

# Add users, posts
p1 = Playlist(name='testplaylist1', description="testdesc1")
p2 = Playlist(name='testplaylist2', description="testdesc2")
p3 = Playlist(name='testplaylist3')

# Add new objects to session, so they'll persist
db.session.add(p1)
db.session.add(p2)
db.session.add(p3)

# Commit--otherwise, this never gets saved!
db.session.commit()

# Repeat for posts
s1 = Song(title='TestSong1', artist='TestArtist1')
s2 = Song(title='TestSong2', artist='TestArtist1')
s3 = Song(title='TestSong3', artist='TestArtist2')

db.session.add(s1)
db.session.add(s2)
db.session.add(s3)

db. session.commit()

# Repeat for PostTags
ps1 = PlaylistSong(playlist_id=1, song_id=1)
ps2 = PlaylistSong(playlist_id=2, song_id=2)
ps3 = PlaylistSong(playlist_id=3, song_id=3)
ps4 = PlaylistSong(playlist_id=3, song_id=1)
ps5 = PlaylistSong(playlist_id=2, song_id=3)
ps6 = PlaylistSong(playlist_id=1, song_id=3)


db.session.add(ps1)
db.session.add(ps2)
db.session.add(ps3)
db.session.add(ps4)
db.session.add(ps5)
db.session.add(ps6)

db.session.commit()
