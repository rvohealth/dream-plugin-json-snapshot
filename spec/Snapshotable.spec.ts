/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import User from '../test-app/app/models/User.js'

describe('Snapshotable', () => {
  it("renders a JSON representation of a model's attributes", async () => {
    const user = await User.create({ name: 'fred', email: 'fred@fred' })

    const snapshot = await user.takeSnapshot()
    expect(snapshot.email).toEqual('fred@fred')
    expect(snapshot.name).toEqual('fred')
  })

  context('SnapshotableIgnore is applied to one of the fields', () => {
    it('does not render those fields', async () => {
      const user = await User.create({ name: 'fred', email: 'fred@fred', loginCount: 2 })

      const snapshot = await user.takeSnapshot()
      expect(snapshot.loginCount).toBeUndefined()
    })
  })

  context('associations', () => {
    context('HasMany', () => {
      it("renders a JSON representation of a model's HasMany associations", async () => {
        const user = await User.create({ name: 'fred', email: 'fred@fred' })
        await user.createAssociation('posts', { body: 'post1 body', title: 'post1 title' })
        await user.createAssociation('posts', { body: 'post2 body', title: 'post2 title' })

        const snapshot = await user.takeSnapshot()
        expect(snapshot.posts[0].body).toEqual('post1 body')
        expect(snapshot.posts[0].title).toEqual('post1 title')
        expect(snapshot.posts[1].body).toEqual('post2 body')
        expect(snapshot.posts[1].title).toEqual('post2 title')
      })

      context('soft-deleted records', () => {
        it('are included', async () => {
          const user = await User.create({ name: 'fred', email: 'fred@fred' })
          const post = await user.createAssociation('posts', { body: 'post1 body', title: 'post1 title' })
          await post.destroy()

          const snapshot = await user.takeSnapshot()
          expect(snapshot.posts[0].body).toEqual('post1 body')
          expect(snapshot.posts[0].title).toEqual('post1 title')
        })
      })

      context('through associations', () => {
        it('are omitted since the associations they pass through will already capture that data', async () => {
          const user = await User.create({ name: 'fred', email: 'fred@fred' })
          const post1 = await user.createAssociation('posts')
          const post2 = await user.createAssociation('posts')
          await post1.createAssociation('comments', { body: 'comment 1', numLikes: 7, user })
          await post2.createAssociation('comments', { body: 'comment 2', numLikes: 6, user })

          const snapshot = await user.takeSnapshot()
          expect(snapshot.comments).toBeUndefined()
        })

        context('decorated with SnapshotableFollowThrough', () => {
          it('are included', async () => {
            const user = await User.create({ name: 'fred', email: 'fred@fred' })
            const post1 = await user.createAssociation('posts')
            const post2 = await user.createAssociation('posts')
            await post1.createAssociation('comments', { body: 'comment 1', numLikes: 7, user })
            await post2.createAssociation('comments', { body: 'comment 2', numLikes: 6, user })

            const snapshot = await user.takeSnapshot()

            expect(snapshot.commentsFollowingThrough[0].body).toEqual('comment 1')
            expect(snapshot.commentsFollowingThrough[1].body).toEqual('comment 2')
          })
        })
      })

      context('associations with required on-clause', () => {
        it('are omitted since the on-clause cannot be provided automatically', async () => {
          const user = await User.create({ name: 'fred', email: 'fred@fred' })
          await user.createAssociation('posts', { title: 'My Title' })

          const snapshot = await user.takeSnapshot()
          expect(snapshot.postsWithRequiredOnClause).toBeUndefined()
        })
      })

      context('associations with passthrough on-clause', () => {
        it('are omitted since the on-clause cannot be provided automatically', async () => {
          const user = await User.create({ name: 'fred', email: 'fred@fred' })
          await user.createAssociation('posts', { title: 'My Title' })

          const snapshot = await user.takeSnapshot()
          expect(snapshot.postsWithPassthroughOnClause).toBeUndefined()
        })
      })

      context('nested associations', () => {
        it("renders a JSON representation of a model's nested HasMany associations", async () => {
          const user = await User.create({ name: 'fred', email: 'fred@fred' })
          const post1 = await user.createAssociation('posts')
          const post2 = await user.createAssociation('posts')
          await post1.createAssociation('comments', { body: 'comment 1', numLikes: 7, user })
          await post2.createAssociation('comments', { body: 'comment 2', numLikes: 6, user })

          const snapshot = await user.takeSnapshot()
          expect(snapshot.posts[0].comments[0].body).toEqual('comment 1')
          expect(snapshot.posts[0].comments[0].numLikes).toEqual(7)
          expect(snapshot.posts[1].comments[0].body).toEqual('comment 2')
          expect(snapshot.posts[1].comments[0].numLikes).toEqual(6)
        })
      })

      context('SnapshotableIgnore is applied to one of the fields', () => {
        it('does not render those fields', async () => {
          const user = await User.create({ name: 'fred', email: 'fred@fred' })
          await user.createAssociation('posts', { body: null, title: 'post1 title' })

          const snapshot = await user.takeSnapshot()
          expect(snapshot.posts[0].nullComments).toBeUndefined()
        })
      })
    })

    context('HasOne', () => {
      it("renders a JSON representation of a model's HasOne associations", async () => {
        const user = await User.create({ name: 'fred', email: 'fred@fred' })
        await user.createAssociation('posts', { body: 'post1 body', title: 'post1 title' })
        await user.createAssociation('posts', { body: 'post2 body', title: 'post2 title' })

        const snapshot = await user.takeSnapshot()
        expect(snapshot.mostRecentPost.body).toEqual('post1 body')
        expect(snapshot.mostRecentPost.title).toEqual('post1 title')
      })

      context('soft-deleted records', () => {
        it('are included', async () => {
          const user = await User.create({ name: 'fred', email: 'fred@fred' })
          const post = await user.createAssociation('posts', { body: 'post1 body', title: 'post1 title' })
          await post.destroy()

          const snapshot = await user.takeSnapshot()
          expect(snapshot.mostRecentPost.body).toEqual('post1 body')
          expect(snapshot.mostRecentPost.title).toEqual('post1 title')
        })
      })

      context('nested associations', () => {
        it("renders a JSON representation of a model's nested HasOne associations", async () => {
          const user = await User.create({ name: 'fred', email: 'fred@fred' })
          const post1 = await user.createAssociation('posts')
          const post2 = await user.createAssociation('posts')
          await post1.createAssociation('comments', { body: 'comment 1', numLikes: 7, user })
          await post2.createAssociation('comments', { body: 'comment 2', numLikes: 6, user })

          const snapshot = await user.takeSnapshot()
          expect(snapshot.mostRecentPost.mostRecentComment.body).toEqual('comment 1')
          expect(snapshot.mostRecentPost.mostRecentComment.numLikes).toEqual(7)
        })
      })

      context('SnapshotableIgnore is applied to one of the fields', () => {
        it('does not render those fields', async () => {
          const user = await User.create({ name: 'fred', email: 'fred@fred' })
          await user.createAssociation('posts', { body: null, title: 'post1 title' })

          const snapshot = await user.takeSnapshot()
          expect(snapshot.posts[0].nullComments).toBeUndefined()
        })
      })
    })

    context('BelongsTo', () => {
      it('does not render belongs to associations', async () => {
        const user = await User.create({ name: 'fred', email: 'fred@fred' })
        const post = await user.createAssociation('posts', { body: 'post1 body', title: 'post1 title' })

        const snapshot = await post.takeSnapshot()
        expect(snapshot.user).toBeUndefined()
      })
    })
  })
})
