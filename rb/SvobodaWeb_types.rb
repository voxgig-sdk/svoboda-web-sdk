# frozen_string_literal: true

# Typed models for the SvobodaWeb SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Highlight entity data model.
#
# @!attribute [rw] content
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] timestamp
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
Highlight = Struct.new(
  :content,
  :id,
  :timestamp,
  :title,
  :url,
  keyword_init: true
)

# Request payload for Highlight#list.
#
# @!attribute [rw] content
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] timestamp
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
HighlightListMatch = Struct.new(
  :content,
  :id,
  :timestamp,
  :title,
  :url,
  keyword_init: true
)

