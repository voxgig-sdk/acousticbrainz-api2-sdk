# AcousticbrainzApi2 SDK utility: make_context

from projectname_sdk.core.context import AcousticbrainzApi2Context


def make_context_util(ctxmap, basectx):
    return AcousticbrainzApi2Context(ctxmap, basectx)
