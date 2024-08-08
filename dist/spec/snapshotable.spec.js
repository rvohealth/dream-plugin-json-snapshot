"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
const globals_1 = require("@jest/globals");
const User_1 = __importDefault(require("../test-app/app/models/User"));
describe('Snapshotable', () => {
    it("renders a JSON representation of a model's attributes", async () => {
        const user = await User_1.default.create({ name: 'fred', email: 'fred@fred' });
        const snapshot = await user.takeSnapshot();
        expect(snapshot.email).toEqual('fred@fred');
        expect(snapshot.name).toEqual('fred');
    });
    (0, globals_1.describe)('HideFromSnapshotable is applied to one of the fields', () => {
        it('does not render those fields', async () => {
            const user = await User_1.default.create({ name: 'fred', email: 'fred@fred', loginCount: 2 });
            const snapshot = await user.takeSnapshot();
            expect(snapshot.loginCount).toBeUndefined();
        });
    });
    (0, globals_1.describe)('associations', () => {
        (0, globals_1.describe)('HasMany', () => {
            it("renders a JSON representation of a model's HasMany associations", async () => {
                const user = await User_1.default.create({ name: 'fred', email: 'fred@fred' });
                await user.createAssociation('posts', { body: 'post1 body', title: 'post1 title' });
                await user.createAssociation('posts', { body: 'post2 body', title: 'post2 title' });
                const snapshot = await user.takeSnapshot();
                expect(snapshot.posts[0].body).toEqual('post1 body');
                expect(snapshot.posts[0].title).toEqual('post1 title');
                expect(snapshot.posts[1].body).toEqual('post2 body');
                expect(snapshot.posts[1].title).toEqual('post2 title');
            });
            (0, globals_1.describe)('nested associations', () => {
                it("renders a JSON representation of a model's nested HasMany associations", async () => {
                    const user = await User_1.default.create({ name: 'fred', email: 'fred@fred' });
                    const post1 = await user.createAssociation('posts');
                    const post2 = await user.createAssociation('posts');
                    await post1.createAssociation('comments', { body: 'comment 1', numLikes: 7, user });
                    await post2.createAssociation('comments', { body: 'comment 2', numLikes: 6, user });
                    const snapshot = await user.takeSnapshot();
                    expect(snapshot.posts[0].comments[0].body).toEqual('comment 1');
                    expect(snapshot.posts[0].comments[0].numLikes).toEqual(7);
                    expect(snapshot.posts[1].comments[0].body).toEqual('comment 2');
                    expect(snapshot.posts[1].comments[0].numLikes).toEqual(6);
                });
            });
            (0, globals_1.describe)('HideFromSnapshotable is applied to one of the fields', () => {
                it('does not render those fields', async () => {
                    const user = await User_1.default.create({ name: 'fred', email: 'fred@fred' });
                    await user.createAssociation('posts', { body: null, title: 'post1 title' });
                    const snapshot = await user.takeSnapshot();
                    expect(snapshot.posts[0].nullComments).toBeUndefined();
                });
            });
        });
        (0, globals_1.describe)('HasOne', () => {
            it("renders a JSON representation of a model's HasOne associations", async () => {
                const user = await User_1.default.create({ name: 'fred', email: 'fred@fred' });
                await user.createAssociation('posts', { body: 'post1 body', title: 'post1 title' });
                await user.createAssociation('posts', { body: 'post2 body', title: 'post2 title' });
                const snapshot = await user.takeSnapshot();
                expect(snapshot.mostRecentPost.body).toEqual('post2 body');
                expect(snapshot.mostRecentPost.title).toEqual('post2 title');
            });
            (0, globals_1.describe)('nested associations', () => {
                it("renders a JSON representation of a model's nested HasOne associations", async () => {
                    const user = await User_1.default.create({ name: 'fred', email: 'fred@fred' });
                    const post1 = await user.createAssociation('posts');
                    const post2 = await user.createAssociation('posts');
                    await post1.createAssociation('comments', { body: 'comment 1', numLikes: 7, user });
                    await post2.createAssociation('comments', { body: 'comment 2', numLikes: 6, user });
                    const snapshot = await user.takeSnapshot();
                    expect(snapshot.mostRecentPost.mostRecentComment.body).toEqual('comment 2');
                    expect(snapshot.mostRecentPost.mostRecentComment.numLikes).toEqual(6);
                });
            });
            (0, globals_1.describe)('HideFromSnapshotable is applied to one of the fields', () => {
                it('does not render those fields', async () => {
                    const user = await User_1.default.create({ name: 'fred', email: 'fred@fred' });
                    await user.createAssociation('posts', { body: null, title: 'post1 title' });
                    const snapshot = await user.takeSnapshot();
                    expect(snapshot.posts[0].nullComments).toBeUndefined();
                });
            });
        });
        (0, globals_1.describe)('BelongsTo', () => {
            it('does not render belongs to associations', async () => {
                const user = await User_1.default.create({ name: 'fred', email: 'fred@fred' });
                const post = await user.createAssociation('posts', { body: 'post1 body', title: 'post1 title' });
                const snapshot = await post.takeSnapshot();
                expect(snapshot.user).toBeUndefined();
            });
        });
    });
});
