Contributing to this project
============================

This document aims to clarify how to contribute to this project, and what the process looks like from various points of view. The policies in this document are intended to foster collaboration, and favor discussions based in fact over those based in opinion.

Additionally, the policies and processes described herein are intended as a guide for contributors and maintainers alike, such that there is little room for doubt when deciding whether or not to accept a contribution.

For contributors
----------------

First things first – thank you very much for considering contributing to this project!

Any kind of contribution is encouranged and welcome, even changes to this very document. When you contribute a change, whether it is to documentation, code, or any other project asset, it must be reviewed before being merged. The process looks like this:

1. Review the [project license][lic]
  - If the project license prohibits you from making changes, please consider highlighting this to the project maintainers
2. Make your changes
3. Submit your changes
4. Review your changes

That's right, reviewing your changes isn't just up to the maintainers of the project, but anyone interesting in contributing – including you!

When reviewing, any concerns with the changes should be addressed through testing and objective measurements. If there is pre-existing documented evidence that the changes aren't appropriate, that should also be used in review discussions. The project may also have automated integrity checks, such as build processes or tests. If your changes do not pass these, please review whether your changes are wrong, or in fact whether the tests themselves are wrong.

If you feel your changes were incorrectly rejected, please refer the maintainer to this document and politely ask them to base their decision in fact.

Again, thank you very much for contributing to this project!

For maintainers
---------------

The first thing to check when deciding whether to accept or reject a contribution is: does it pass the automated integrity checks?

If the contribution passes the build, that should be the first seal of approval. At that point, as a maintainer you should take some time to review what the changes are, and see if there's any reasons not to accept the changes in their *current* state. A contribution should be viewed as a discussion, where you as the maintainer guides the contributor with the ultimate goal of accepting their changes.

Here's a check list for things to look for when reviewing a contribution:

1. Do the changes pass the tests?
  - Consider whether the tests themselves are correct
2. Do the changes have any obvious security issues?
  - Back these claims up with documentation, and see if the issues can be resolved
3. Do the changes have performance issues?
  - Back these claims up with measurements, and see if the issues can be resolved
4. Do the changes violate pre-existing, documented design decisions or policies?
  - Consider whether the design decisions or policies should change
5. Do the changes violate pre-existing, documented compatibility policies?
  - Can the contribution be accepted in a later version?
  - Consider whether the policies should be ignored or changed
6. Do the changes alter documentation in such a way that it is incorrect or otherwise doesn't fit the de facto style of writing?
  - Back up any claims of incorrectness with fact – if possible – and see if these issues can be resolved
  - Consider whether the style of writing should change to accomodate the contribution
7. Do the changes violate the [project license][lic]?

When reviewing the changes, remember to base your views in fact, not opinion. Here are a few reasons that should *never* be cause for rejecting a change:

- Code style
  + If it's important, write a style guide and make it part of the automated checks
- How something is implemented
  + If there are no security or performance concerns with the submission, and it passes all the tests, then it's valid

Regardless of whether contributions are contested, as a maintainer you should consider just accepting them after some time if there is no compelling evidence to suggest otherwise. Especially so if the debate becomes inactive.

No matter what, please remember that the contributor took time out of their life to help you with this project, and do your utmost to keep the discussion polite and civil with the ultimate goal of eventually accepting their contributions. If for whatever reason this isn't possible, please try to ensure this is based in fact rather than opinion, and always politely state why the changes can not be accepted.

---

Regardless of whether you are a contributor or maintainer (or both!) of this project – thank you!

[lic]: LICENSE